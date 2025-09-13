import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// API para obtener miembros disponibles de un grupo específico
export async function GET(request: Request, { params }: { params: Promise<{ group: string }> }) {
  try {
    const { group } = await params;
    const groupName = decodeURIComponent(group).toUpperCase();
    
    // Mapeo de grupos a sus miembros
    const groupMembers: Record<string, string[]> = {
      'TWICE': [
        'NAYEON', 'JEONGYEON', 'MOMO', 'SANA', 'JIHYO', 
        'MINA', 'DAHYUN', 'CHAEYOUNG', 'TZUYU'
      ],
      'STRAY KIDS': [
        'BANG CHAN', 'LEE KNOW', 'CHANGBIN', 'HYUNJIN', 
        'HAN', 'FELIX', 'SEUNGMIN', 'I.N'
      ],
      'TXT': ['YEONJUN', 'SOOBIN', 'BEOMGYU', 'TAEHYUN', 'HUENINGKAI'],
      'BTS': ['RM', 'JIN', 'SUGA', 'J-HOPE', 'JIMIN', 'V', 'JUNGKOOK'],
      'BLACKPINK': ['JISOO', 'JENNIE', 'ROSÉ', 'LISA'],
      'NewJeans': ['MINJI', 'HANNI', 'DANIELLE', 'HAERIN', 'HYEIN'],
      'ITZY': ['YEJI', 'LIA', 'RYUJIN', 'CHAERYEONG', 'YUNA'],
      'aespa': ['KARINA', 'WINTER', 'GISELLE', 'NINGNING'],
      'IVE': ['YUJIN', 'GAEUL', 'REI', 'WONYOUNG', 'LIZ', 'LEESEO'],
      '(G)I-DLE': ['MIYEON', 'MINNIE', 'SOYEON', 'YUQI', 'SHUHUA'],
      'LE SSERAFIM': ['SAKURA', 'CHAEWON', 'YUNJIN', 'KAZUHA', 'EUNCHAE'],
      'SEVENTEEN': ['S.COUPS', 'JEONGHAN', 'JOSHUA', 'JUN', 'HOSHI', 'WONWOO', 'WOOZI', 'DK', 'MINGYU', 'THE8', 'SEUNGKWAN', 'VERNON', 'DINO'],
      'KATSEYE': ['SOPHIA', 'MANON', 'DANIELA', 'LARA', 'MEGAN', 'YOONCHAE'],
      'ENHYPEN': ['JUNGWON', 'HEESEUNG', 'JAY', 'JAKE', 'SUNGHOON', 'SUNOO', 'NI-KI'],
      'Red Velvet': ['IRENE', 'SEULGI', 'WENDY', 'JOY', 'YERI'],
      'Girls Generation': ['TAEYEON', 'SUNNY', 'TIFFANY', 'HYOYEON', 'YURI', 'SOOYOUNG', 'YOONA', 'SEOHYUN'],
      'SNSD': ['TAEYEON', 'SUNNY', 'TIFFANY', 'HYOYEON', 'YURI', 'SOOYOUNG', 'YOONA', 'SEOHYUN'],
      'NMIXX': ['LILY', 'HAEWON', 'SULLYOON', 'BAE', 'JIWOO', 'KYUJIN'],
      'RIIZE': ['SHOTARO', 'EUNSEOK', 'SUNGCHAN', 'WONBIN', 'SEUNGHAN', 'SOHEE', 'ANTON'],
      'KISS OF LIFE': ['JULIE', 'NATTY', 'BELLE', 'HANEUL'],
      'FIFTY FIFTY': ['SAENA', 'SIO', 'CHANELLE', 'YEWON'],
      'ILLIT': ['YUNAH', 'MINJU', 'MOKA', 'WONHEE', 'IROHA']
    };

    const members = groupMembers[groupName] || [];

    if (members.length === 0) {
      return NextResponse.json({
        group: groupName,
        members: [],
        message: `Grupo "${groupName}" no encontrado o no tiene miembros definidos`
      });
    }

    // Obtener productos del grupo para ver qué miembros tienen productos disponibles
    const { data: rawData, error } = await supabase
      .from('products')
      .select('tags')
      .eq('is_active', true)
      .contains('tags', [groupName]);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al obtener miembros disponibles' },
        { status: 500 }
      );
    }

    // Contar productos por miembro
    const memberCounts = new Map();
    rawData?.forEach(product => {
      // Solo contar productos que tengan el tag del grupo
      if (product.tags?.includes(groupName)) {
        product.tags?.forEach((tag: string) => {
          if (members.includes(tag)) {
            memberCounts.set(tag, (memberCounts.get(tag) || 0) + 1);
          }
        });
      }
    });

    const availableMembers = Array.from(memberCounts.entries())
      .map(([member_name, product_count]) => ({
        member_name,
        product_count
      }))
      .sort((a, b) => b.product_count - a.product_count);

    // También incluir la opción "ALL" para ver todos los productos del grupo
    const totalGroupProducts = rawData?.length || 0;
    
    const response = {
      group: groupName,
      members: [
        { member_name: 'ALL', product_count: totalGroupProducts },
        ...availableMembers
      ],
      totalMembers: availableMembers.length,
      message: availableMembers.length > 0 ? 
        `¡Elige un miembro de ${groupName} o ve todos los productos!` :
        `No hay productos disponibles de miembros específicos de ${groupName}, pero puedes ver productos grupales.`
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
