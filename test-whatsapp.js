// Prueba simple del botón de WhatsApp
const testProduct = {
  id: "test-id",
  title: "TWICE - What Is Love? Lightstick",
  category: "Lightstick",
  price_usd: 45
};

const phoneNumber = "5491130201227";

const createWhatsAppMessage = (product) => {
  const message = `¡Hola! 👋 Me interesa este producto de tu tienda:

📱 *${product.title}*
🏷️ Categoría: ${product.category}
💰 Precio: $${product.price_usd} USD

¿Podrías darme más información sobre disponibilidad, envío y formas de pago? 

¡Gracias! 😊`;
  
  return encodeURIComponent(message);
};

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${createWhatsAppMessage(testProduct)}`;

console.log("URL de WhatsApp generada:");
console.log(whatsappUrl);
console.log("\nURL decodificada:");
console.log(decodeURIComponent(whatsappUrl));
