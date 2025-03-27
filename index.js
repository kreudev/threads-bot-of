import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const SESSION_ID = "73507626285%3ABYa6npKZIeuubs%3A17%3AAYdCI_UQ5kg45xD6azrqyK67M6CbswR4nHkokNlydA";

// Array de mensajes
const mensajes = [
    "Estoy tan... que si me sigues te llegarán dos grandes premios 🙈🙈😇",
    "¿Cuáles son los pros de llevar faldita?? 😇",
    "Si te hablo, ¿aceptas? ❤️🤗",
    "Alguien por WhatsApp, necesito amistades nuevas 😣😣😳",
    "Quiero un novio 😣 nadie quiere salir 😐, dale ❤️ si tú saldrías conmigo 😻😳",
    "A mis nuevos seguidores por ser tan buenos les voy a regalar una 🎁 que hará feliz a tu amigo 😁😁",
    "2019: Soltera\n2020: Soltera\n2021: Soltera\n2022: Soltera Pro\n2023: Soltera Pro Max\n2024: Soltera Ultra Pro Max\n2025: Soltera Nokia 3310 😢😳",
    "En línea ((🟢))\nTe ha mencionado hace 1 minuto\n👤 Le gustó tu foto de perfil\n👤 Visitó tu perfil más de (5) veces\n👤 Te envió un mensaje\n👤 Esperando tu respuesta 😳",
    "Dale like y te mando regalito 🎁 de mis dos amigas 🥰🥰 DM 😳",
    "Mándame un corazón 💗 y te mando mi melocotón 🍑😳😳",
    "Dónde están los solteros 😏😆🌸😳",
    "Un rapidín con falda 🤭🍑🍑😳",
    "¿Quién quiere una amistad sincera? 💖✨",
    "Te sigo si me sigues 😏💬",
    "Mándame un mensaje y te cuento un secreto 🤫💌",
    "Si te invito a cenar, ¿qué pedirías? 🍕🍣🍔",
    "Hoy tengo ganas de algo dulce... ¿serás tú? 🍭😉",
    "Estoy aburrida, háblame 😪📩",
    "Si te digo la verdad, ¿me creerías? 😏🔐",
    "Una faldita y buenas vibras, ¿qué más se necesita? 😇💃",
    "Te reto a reaccionar a este post si te gusto 👀🔥",
    "El que me mande DM le cuento algo que nadie sabe 👂🤫",
    "Si fueras un postre, ¿cuál serías? 🍦🍩🍫",
    "Hoy me siento traviesa 😜💋",
    "Si me das follow, te paso mi secreto mejor guardado 😏📩",
    "Busco cómplice para hacer locuras, ¿quién se apunta? 😜👀",
    "Los solteros, reportense en los comentarios 💬🔥",
    "Quiero alguien que me diga 'vámonos de viaje ahora mismo' ✈️🌍",
    "El primer que reaccione le mando un mensajito 🤭💌",
    "DM si quieres conocerme mejor 🤫😏",
    "Si te digo 'vente', ¿vienes? 👀🔥",
    "Nadie me responde, así que aquí sigo esperando 😞📩",
    "Hoy amanecí con ganas de recibir halagos, ¡déjame uno! 💋💌",
    "Si te gustan las chicas misteriosas, ya sabes qué hacer 😉🔐",
    "Te reto a mandarme un mensaje sin miedo 😏🔥",
    "Si me sigues, te llega buena suerte por 3 días 🍀💫",
    "Solo quiero un abrazo virtual ahora mismo 🤗💌",
    "Voy a elegir a alguien al azar para una sorpresa, comenta 'YO' 👇😏",
    "Si estás viendo esto, es porque el destino quiere que me hables 😜📩",
    "Me aburro fácil, así que sorpréndeme con tu mejor mensaje 😏💬",
    "Hoy es día de travesuras, ¿quién se apunta? 😜🔥",
    "Si fueras un emoji, ¿cuál serías? 👀💖",
    "Mi WhatsApp está esperando mensajes interesantes... 😏📩",
    "Mándame un audio y te digo qué tan sexy suena tu voz 🎙️🔥",
    "Una palabra que te describa en los comentarios 👇💬",
    "Voy a confesar algo en 3...2...1... 🤫🔥",
    "Si me das un buen piropo, te respondo con algo picante 😉💋",
    "La vida es corta, mándame ese mensaje que tanto dudas 😏📩",
    "Busco cómplice para ver series hasta el amanecer, ¿quién? 🍿🌙",
    "Solo para valientes: dime algo atrevido y te respondo 👀🔥",
    "Te apuesto a que no puedes decirme algo que me haga sonrojar 😳💋",
    "El que me haga reír más, gana una sorpresa especial 🎁😂",
    "Piénsalo dos veces antes de ignorarme, luego no digas que no avisé 😏💬",
    "Acepto cumplidos, flores virtuales y chocolates imaginarios 🍫💌",
    "Hoy amanecí con ganas de coquetear, ¿quién me sigue el juego? 😘🔥",
    "Si yo fuera un helado, ¿de qué sabor crees que sería? 🍦😉",
    "El que no me hable hoy, me debe una cena 🍽️😏",
    "No soy fácil de impresionar, pero puedes intentarlo 💋🔥",
    "Si me sigues ahora, te doy un dato curioso sobre mí 😏📩",
    "Solo quiero alguien con quien hablar hasta quedarnos dormidos 📱💤",
    "Si esto aparece en tu feed, es una señal para que me hables 😉💬",
    "Voy a responder al primer DM con mi emoji favorito 😜📩",
    "El que adivine mi color favorito, gana un regalo virtual 🎁✨",
    "Hoy tengo ganas de hacer locuras, ¿quién se apunta? 😏🔥",
    "Te desafío a decirme tu crush sin miedo 😜💖",
    "Voy a responder solo a los mensajes creativos, sorpréndeme 😏💬",
    "Si no me hablas ahora, perderás tu oportunidad 😜📩",
    "Hazme una pregunta que nunca nadie me haya hecho 🤔💬",
    "Si te contesto rápido, significa que me interesas 😉🔥",
    "Te reto a enviarme el sticker más gracioso que tengas 😂📩",
    "El primer mensaje bonito que reciba tendrá una respuesta especial 💌💖",
    "Dime un secreto y prometo no contarlo 🔐😉",
    "Si te gusta alguien, mándale este post como indirecta 😏💌",
    "No busco nada serio, solo risas y buenos momentos 😆🔥",
    "Si crees que podemos ser buenos amigos, mándame un '👋' 📩",
    "El que me haga reír hoy, se gana un follow 👀🔥",
    "Tengo un enigma para ti, ¿te atreves a resolverlo? 🧐💬",
    "Déjame un emoji que describa cómo te sientes ahora mismo 👇😏",
    "Solo para los valientes: mándame tu peor chiste 😆📩",
    "Si me mandas una canción que me guste, te respondo con un secreto 🎵🤫",
    "Te reto a decirme tu última búsqueda en Google sin miedo 🔎😜",
    "Si llegaste hasta aquí, mándame un '🔥' y hablamos 😏💬",
    "Estoy activa en mi página azul 🔹🤫",
    "Te estoy esperando en mi only 🔥",
    "Estoy en mi only lista para jugar... 🎲",
    "Ya sabes donde encontrarme, no te lo pierdas 🔹",
    "Hoy hay sorpresas en mi página, ¿te lo vas a perder? 🔥😏",
    "Te tengo algo especial en mi página azul 🔹, corre a verlo 🤫",
    "Solo los que entran hoy podrán ver lo nuevo 🔥🔹",
    "Estoy en línea en mi página, ven a verme 💋",
    "No preguntes, solo entra y mira por ti mismo 🔥👀",
    "Hoy estoy más traviesa que nunca en mi página azul 🔹🥵",
    "Ya estoy lista para la acción, ¿te unes? 🔥",
    "En mi only hay algo que no has visto aún... 😏🔹",
    "Hoy te tengo un regalo especial en mi página 🔹🎁",
    "Si quieres jugar conmigo, ya sabes dónde encontrarme 🔥",
    "No te lo imagines, ven y míralo con tus propios ojos 🔹👀",
    "Hoy toca sesión especial, ¿te lo vas a perder? 🔥",
    "Estoy conectada ahora mismo en mi página azul 🔹😈",
    "Solo para los más atrevidos, ven a verme 🔥🔹",
    "Entra ahora y dime qué te parece mi nueva sorpresa 🔥",
    "Mis seguidores VIP ya están disfrutando, ¿y tú? 🔹🥵",
    "Hoy estoy más activa que nunca, entra y descúbrelo 🔥",
    "Lo mejor está pasando en mi página, ¿vienes? 🔹😏",
    "Tengo algo exclusivo para ti en mi perfil 🔥",
    "No te lo pienses más, entra y disfruta 🔹💋",
    "No te arrepentirás de haber entrado hoy 🔥",
    "Tengo algo nuevo preparado solo para ti 🔹🤫",
    "Si te atreves, entra ahora mismo 🔥😏",
    "Hoy hay contenido especial solo para mis seguidores 🔹🥵",
    "Ven a descubrir lo que tengo para ti 🔥",
    "No es un sueño, es real... y está en mi página 🔹💋",
    "Estoy esperando a los más curiosos 🔥😏",
    "Hoy toca sesión de juegos, ¿te atreves a entrar? 🔹🎲",
    "Solo los que entran hoy verán la sorpresa 🔥",
    "No te quedes fuera, ven a verme 🔹👀",
    "Estoy lista para recibirte, ¿vienes? 🔥",
    "Me encanta jugar... pero más en mi página 🔹🎲",
    "Solo para los que saben dónde buscar 🔥💋",
    "Algo nuevo te espera en mi perfil, ¿vienes? 🔹😏",
    "Hoy la diversión está garantizada en mi página 🔥",
    "Lo que pasa en mi página, se queda en mi página 🔹😈",
    "Hoy toca un poco de travesuras, ¿te animas? 🔥",
    "No te quedes con la duda, entra ahora 🔹🤫",
    "Lo que ves aquí es solo el comienzo 🔥😏",
    "Algo especial está esperándote en mi perfil 🔹💋",
    "No me busques en otro lado, solo ahí 🔥",
    "Hoy hay contenido VIP para los más fieles 🔹👀",
    "¿Listo para lo que tengo preparado para ti? 🔥",
    "Te sorprenderás cuando entres 🔹😈",
    "La mejor parte del día está en mi página 🔥",
    "No es lo mismo imaginarlo que verlo 🔹🥵",
    "Algo que no has visto antes te espera 🔥💋",
    "Estoy en vivo en mi página, ven rápido 🔹👀",
    "Te estoy esperando con algo especial 🔥",
    "Hoy tengo ganas de sorprenderte 🔹😏",
    "La única forma de saberlo es entrando 🔥💋",
    "No dejes pasar la oportunidad de verme 🔹",
    "Hoy tengo un reto para ti en mi página 🔥",
    "Las mejores sorpresas están ahí 🔹😈",
    "Si no entras, te perderás algo increíble 🔥",
    "Estoy más atrevida que nunca en mi página 🔹🥵",
    "Ven y dime si te gusta lo que tengo 🔥💋",
    "No pierdas más tiempo, ven ahora 🔹",
    "Me gusta cuando me visitas en mi página 🔥😏",
    "Hoy tengo algo exclusivo, solo para valientes 🔹👀",
    "Solo los que entren hoy verán lo mejor 🔥",
    "Tengo algo muy especial preparado para ti 🔹🤫",
    "Una vez que entres, no querrás salir 🔥💋",
    "Estoy lista, solo faltas tú 🔹😈",
    "Hoy es un buen día para visitarme 🔥",
    "Tengo una sorpresa guardada en mi perfil 🔹👀",
    "La noche se pondrá interesante en mi página 🔥😏",
    "Tienes curiosidad... y lo sabes 🔹🥵",
    "Lo que ves aquí es solo un adelanto 🔥💋",
    "Si te atreves, entra y descúbrelo 🔹",
    "Hoy tengo ganas de jugar, ¿vienes? 🔥😏",
    "El mejor contenido lo encuentras ahí 🔹🤫",
    "Tú solo entra, yo me encargo del resto 🔥",
    "Mis mejores momentos están en mi página 🔹💋",
    "No preguntes, solo entra y disfruta 🔥😈",
    "Hoy hay contenido premium, ¿te lo vas a perder? 🔹🥵",
    "Si quieres saber más, ya sabes dónde buscar 🔥",
    "Te espero con algo especial 🔹😏",
    "Si entras ahora, te sorprenderás 🔥💋",
    "Estoy en mi mejor momento, ven a verme 🔹",
    "No pierdas la oportunidad de verme 🔥😈",
    "Si me extrañaste, aquí estoy 🔹🥵",
    "Algo inesperado te espera en mi página 🔥",
    "Ven a descubrir lo que tengo preparado 🔹💋",
    "¿Listo para la mejor experiencia? 🔥",
    "El que entra, se queda 🔹🤫",
    "Hoy estoy más activa que nunca 🔥💋",
    "Lo que pasa en mi página es inolvidable 🔹😏",
    "Ven y dime qué te parece lo nuevo 🔥",
    "No puedo esperar más, entra ahora 🔹💋",
    "Hoy tengo algo especial solo para ti 🔥",
    "Si te gustan las sorpresas, te encantará 🔹🥵",
    "Solo para los que se atreven 🔥💋",
    "No te quedes con la duda, descúbrelo 🔹😏",
    "La espera terminó, ven a disfrutar 🔥",
    "No todos pueden ver esto... ¿tú sí? 🔹🤫"
];

// Función para obtener un mensaje aleatorio
function getMensajeAleatorio() {
    return mensajes[Math.floor(Math.random() * mensajes.length)];
}

async function postToThreads() {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    
    // Configurar el viewport
    await page.setViewport({
        width: 1280,
        height: 800
    });
    
    // Establecer las cookies de Instagram antes de navegar
    await page.setCookie({
        name: 'sessionid',
        value: SESSION_ID,
        domain: '.threads.net',
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'Lax'
    });

    // Navegar a Threads
    await page.goto('https://www.threads.net/');
    
    while (true) {
        try {
            console.log('Esperando 5 segundos para que la página cargue completamente...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            console.log('Buscando el botón de cookies...');
            const cookieButton = await page.waitForSelector('xpath=//*[@id="barcelona-page-layout"]/div/div/div[2]/div[1]/div[2]/div/div[1]', { timeout: 30000 });
            
            if (cookieButton) {
                console.log('Botón de cookies encontrado, verificando visibilidad...');
                const isVisible = await cookieButton.evaluate(button => {
                    const style = window.getComputedStyle(button);
                    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                });
                
                if (isVisible) {
                    console.log('Botón visible, intentando hacer clic...');
                    await cookieButton.click();
                    console.log('Cookies aceptadas');
                    
                    // Esperar un momento y escribir el texto
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const mensajeAleatorio = getMensajeAleatorio();
                    console.log('Escribiendo mensaje:', mensajeAleatorio);
                    await page.keyboard.type(mensajeAleatorio);
                    
                    // Presionar Command + Enter
                    console.log('Enviando mensaje...');
                    await page.keyboard.down('Meta');
                    await page.keyboard.press('Enter');
                    await page.keyboard.up('Meta');
                } else {
                    console.log('El botón está presente pero no es visible');
                }
            } else {
                console.log('No se encontró el botón de cookies');
            }
        } catch (error) {
            console.log('Error al buscar el botón de cookies:', error.message);
        }
        // Esperar 5 minutos antes de la siguiente publicación
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
    }

    await browser.close();
}

postToThreads().catch(console.error);
