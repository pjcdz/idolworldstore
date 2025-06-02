"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface DeliveryIndicatorProps {
  className?: string;
}

export function DeliveryIndicator({ className }: DeliveryIndicatorProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getNextDeliveryInfo = () => {
    const now = currentTime;
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let participationOpen: boolean;
    let participationEndDate: Date;
    let nextDeliveryDate: Date;
    let currentPeriod: string;

    if (currentDay <= 15) {
      participationOpen = currentDay <= 8;
      participationEndDate = new Date(currentYear, currentMonth, 8, 23, 59, 59);
      nextDeliveryDate = new Date(currentYear, currentMonth, 15);
      currentPeriod = participationOpen
        ? "Primera quincena"
        : "Procesando primera quincena";
    } else {
      participationOpen = currentDay >= 16 && currentDay <= 23;
      participationEndDate = new Date(
        currentYear,
        currentMonth,
        23,
        23,
        59,
        59
      );
      nextDeliveryDate = new Date(currentYear, currentMonth + 1, 1);
      currentPeriod = participationOpen
        ? "Segunda quincena"
        : "Procesando segunda quincena";
    }

    return {
      participationOpen,
      participationEndDate,
      nextDeliveryDate,
      currentPeriod,
    };
  };

  const {
    participationOpen,
    participationEndDate,
    nextDeliveryDate,
    currentPeriod,
  } = getNextDeliveryInfo();

  const getTimeRemaining = () => {
    if (!participationOpen) return null;

    const timeDiff = participationEndDate.getTime() - currentTime.getTime();
    if (timeDiff <= 0) return null;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const timeRemaining = getTimeRemaining();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`w-full bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-zinc-700/50 hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer ${className}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  participationOpen
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              <span className="text-zinc-300 text-sm font-medium">
                {participationOpen
                  ? "Tiempo restante"
                  : "Participación cerrada"}
              </span>
            </div>

            {participationOpen && timeRemaining && (
              <div className="flex items-center gap-1 font-mono text-sm text-zinc-100">
                <span className="font-bold">{timeRemaining.days}</span>
                <span className="text-zinc-500">d</span>
                <span className="font-bold">
                  {timeRemaining.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-zinc-500">h</span>
                <span className="font-bold">
                  {timeRemaining.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-zinc-500">m</span>
                <span className="font-bold">
                  {timeRemaining.seconds.toString().padStart(2, "0")}
                </span>
                <span className="text-zinc-500">s</span>
              </div>
            )}

            {/* Indicador de que es clickeable */}
            <div className="text-zinc-500 text-xs ml-2">▼</div>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-screen max-w-md mx-4 bg-zinc-900/95 backdrop-blur-md border-zinc-700 shadow-2xl"
        align="center"
        sideOffset={8}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-zinc-100 mb-2">
              📦 Cronograma de Entregas
            </h3>
            <Badge
              variant={participationOpen ? "default" : "secondary"}
              className={
                participationOpen
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-zinc-700"
              }
            >
              {currentPeriod}
            </Badge>
          </div>

          <Separator className="bg-zinc-700" />

          {/* Estado actual */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-300 text-sm">Estado actual:</span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    participationOpen ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-zinc-100 text-sm font-medium">
                  {participationOpen ? "Abierto" : "Cerrado"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-300 text-sm">Próxima entrega:</span>
              <span className="text-zinc-100 text-sm font-medium">
                {formatDate(nextDeliveryDate)}
              </span>
            </div>

            {participationOpen && timeRemaining && (
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <div className="text-center space-y-2">
                  <div className="text-zinc-300 text-xs">
                    Tiempo restante para participar
                  </div>
                  <div className="flex items-center justify-center gap-4 text-zinc-100">
                    <div className="text-center">
                      <div className="text-xl font-bold font-mono">
                        {timeRemaining.days}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {timeRemaining.days === 1 ? "día" : "días"}
                      </div>
                    </div>
                    <div className="text-zinc-400">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold font-mono">
                        {timeRemaining.hours.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-zinc-400">horas</div>
                    </div>
                    <div className="text-zinc-400">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold font-mono">
                        {timeRemaining.minutes.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-zinc-400">min</div>
                    </div>
                    <div className="text-zinc-400">:</div>
                    <div className="text-center">
                      <div className="text-xl font-bold font-mono">
                        {timeRemaining.seconds.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-zinc-400">seg</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator className="bg-zinc-700" />

          {/* Cronograma explicativo */}
          <div className="space-y-4">
            <h4 className="text-zinc-100 font-semibold text-sm">
              📅 ¿Cómo funciona?
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-zinc-200 font-medium">
                    Días 1-8 y 16-23
                  </div>
                  <div className="text-zinc-400">
                    Ventana de participación abierta para Group Orders
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-zinc-200 font-medium">
                    Días 9-15 y 24-fin de mes
                  </div>
                  <div className="text-zinc-400">
                    Procesamiento: compras en US y preparación de envíos
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-zinc-200 font-medium">Días 15 y 1ro</div>
                  <div className="text-zinc-400">
                    Entregas programadas fijas cada mes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-700" />

          {/* Info adicional */}
          <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>⏱️ Duración de participación:</span>
                <span className="text-zinc-300">8 días por período</span>
              </div>
              <div className="flex justify-between">
                <span>🛒 Tiempo de procesamiento:</span>
                <span className="text-zinc-300">7 días máximo</span>
              </div>
              <div className="flex justify-between">
                <span>📦 Frecuencia de entregas:</span>
                <span className="text-zinc-300">2 veces por mes</span>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
