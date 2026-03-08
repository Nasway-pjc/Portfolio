const out = document.getElementById('output');
const img = document.getElementById('imageContainer');
const vid = document.getElementById('videoPlayer');

let step = 0;
let ans = {};
let aud = null;

const text1 = `CoilRust

CoilRust — это уникальный игровой проект, который переносит напряжённую атмосферу и острые ощущения Rust в мир Minecraft. Мы стремимся воссоздать саму суть выживания: постоянный риск, стратегические решения и борьбу за существование в условиях полной неопределённости.

С момента появления на карте вас ждёт настоящая проверка на прочность. Только ваши умения, интуиция и расчёт помогут преодолеть все трудности и добиться превосходства.

Что ждёт игроков в CoilRust:
- Добыча ресурсов в условиях постоянной угрозы
- Строительство 
- Напряжённые PvP-сражения и конфликты за территории

Присоединяйтесь к CoilRust, чтобы быть в курсе всех новостей, обновлений и дат запуска. Подписывайтесь на канал и готовьтесь доказать, на что вы способны в этой безжалостной игре на выживание.

CoilRust. Не просто выжить — превзойти всех.

Telegram: https://t.me/Coil_Rust
Discord: https://discord.gg/5nfkWge5tm`;

const text2 = `нету`;

const q = [
    {
        text: 'Привет! Я помогу тебе пройти сюда. Но сначала тест. Ты поддерживаешь вайб кодинга?',
        options: [
            { text: 'Да', image: 'https://forum-cdn.exbo.net/2026-02-15/1771138211-786393-image.png' },
            { text: 'Нет', image: 'https://avatars.mds.yandex.net/i?id=cb4621c5cce276f76c369724e18ef28de5e765f2-5231753-images-thumbs&n=13' },
            { text: 'Немного', image: 'https://avatars.mds.yandex.net/i?id=f119676b232792023687b30120e63a7c_l-9234614-images-thumbs&n=13' }
        ]
    },
    {
        text: 'Брал ли ты чей-то код и выдавал за свой?',
        options: [
            { text: 'Да', image: 'https://avatars.mds.yandex.net/i?id=49f6caa3589c8803eba32c1cd4d60ce3_l-4726647-images-thumbs&n=13' },
            { text: 'Нет', image: 'https://i.pinimg.com/736x/4c/22/92/4c2292e7300d5e2c0f6d2a53322f306d.jpg' }
        ]
    },
    {
        text: 'Ты считаешь что Python это лучший язык мира?',
        options: [
            { text: 'Да', video: true },
            { text: 'Нет', image: 'https://avatars.mds.yandex.net/i?id=77aaaf615e81b47506c4e7310c38117a_l-6946760-images-thumbs&n=13' }
        ]
    }
];

function initAudio() {
    if (!aud) {
        aud = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (aud.state === 'suspended') {
        aud.resume();
    }
}

function playSound(t) {
    try {
        initAudio();
        if (t === 'click') {
            const o = aud.createOscillator();
            const g = aud.createGain();
            o.connect(g);
            g.connect(aud.destination);
            o.frequency.value = 600;
            o.type = 'square';
            g.gain.setValueAtTime(0.15, aud.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, aud.currentTime + 0.08);
            o.start(aud.currentTime);
            o.stop(aud.currentTime + 0.08);
        } else if (t === 'success') {
            const n = [800, 1000, 1200];
            for (let i = 0; i < n.length; i++) {
                const o = aud.createOscillator();
                const g = aud.createGain();
                o.connect(g);
                g.connect(aud.destination);
                o.frequency.value = n[i];
                o.type = 'sine';
                g.gain.setValueAtTime(0.1, aud.currentTime + i * 0.1);
                g.gain.exponentialRampToValueAtTime(0.01, aud.currentTime + i * 0.1 + 0.15);
                o.start(aud.currentTime + i * 0.1);
                o.stop(aud.currentTime + i * 0.1 + 0.15);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function print(txt, d = 0) {
    return new Promise(function(res) {
        setTimeout(function() {
            const l = document.createElement('div');
            l.className = 'text-line';
            let c = 0;
            out.appendChild(l);
            
            function t() {
                if (c < txt.length) {
                    l.textContent += txt[c];
                    c++;
                    out.scrollTop = out.scrollHeight;
                    setTimeout(t, 30);
                } else {
                    res();
                }
            }
            
            t();
        }, d);
    });
}

function showImage(u) {
    return new Promise(function(res) {
        img.innerHTML = '<img src="' + u + '" alt="response" onerror="this.style.display=\'none\'">';
        img.style.display = 'block';
        setTimeout(function() {
            img.style.display = 'none';
            res();
        }, 3000);
    });
}

function showVideo() {
    return new Promise(function(res) {
        vid.src = '1.mp4';
        vid.style.display = 'block';
        vid.play();
        vid.onended = function() {
            vid.style.display = 'none';
            res();
        };
    });
}

function createOptions(o) {
    const d = document.createElement('div');
    d.className = 'options';
    d.id = 'currentOptions';
    
    for (let i = 0; i < o.length; i++) {
        const opt = o[i];
        const b = document.createElement('button');
        b.className = 'option';
        b.textContent = '[' + (i + 1) + '] ' + opt.text;
        b.onclick = function() {
            handleAnswer(i, opt);
        };
        d.appendChild(b);
    }
    
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
}

async function handleAnswer(i, o) {
    playSound('click');
    ans[step] = o.text;
    
    const d = document.getElementById('currentOptions');
    if (d) {
        d.remove();
    }
    
    if (o.image) {
        await showImage(o.image);
    } else if (o.video) {
        await showVideo();
    }
    
    step++;
    
    if (step < q.length) {
        await print('');
        await print(q[step].text);
        createOptions(q[step].options);
    } else {
        await print('');
        await print('Ладно, пропускаю тебя. Добро пожаловать!');
        playSound('success');
        await print('');
        await print('> Нажми на кнопку ниже, чтобы посмотреть портфолио');
        
        await new Promise(function(r) {
            setTimeout(r, 500);
        });
        
        const b = document.createElement('button');
        b.className = 'project-btn-inline';
        b.textContent = '> Открыть портфолио';
        b.onclick = function() {
            showBio();
        };
        out.appendChild(b);
        out.scrollTop = out.scrollHeight;
    }
}

async function start() {
    const l = document.createElement('div');
    l.className = 'text-line';
    l.textContent = '> nasway@portfolio:~$ ./portfolio.sh';
    out.appendChild(l);
    
    await new Promise(function(r) {
        setTimeout(r, 500);
    });
    
    await print('');
    await print('Инициализация портфолио...');
    await print('');
    await print(q[0].text);
    createOptions(q[0].options);
}

document.addEventListener('DOMContentLoaded', function() {
    start();
});

function showBio() {
    const bc = document.getElementById('bioContent');
    const bd = document.createElement('div');
    bd.textContent = text2;
    bc.innerHTML = '';
    bc.appendChild(bd);
    
    const pb = document.createElement('button');
    pb.className = 'project-btn-inline';
    pb.textContent = '> Сейчас я занимаюсь одним главным проектом';
    pb.onclick = function() {
        closeBio();
        showCoilRust();
    };
    bc.appendChild(pb);
    
    document.getElementById('bioModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBio() {
    document.getElementById('bioModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showCoilRust() {
    const pc = document.getElementById('portfolioContent');
    pc.textContent = text1;
    
    const t = pc.textContent;
    pc.innerHTML = t.replace(
        /(https:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="color: #00ff00; text-decoration: underline; cursor: pointer;">$1</a>'
    );
    
    document.getElementById('portfolioModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCoilRust() {
    document.getElementById('portfolioModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

