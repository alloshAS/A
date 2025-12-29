const STORAGE_KEY = "birthday_project_played"; 
const app = document.getElementById("app");

const slides = []; 
let currentSlideIndex = 0;


slides.push(balloonSlide);
slides.push(heartSlide);
slides.push(renderRomanticCardsSlide);
slides.push(cakeSlide);
slides.push(gallerySlide);


if (localStorage.getItem(STORAGE_KEY)) { 
    renderExitScreen(); 
} else { 
    startProject(); 
}

function startProject() { 
    currentSlideIndex = 0; 
    renderStartScreen(); 
}

function nextSlide() { 
    currentSlideIndex++; 
    console.log("Next slide called. Current index:", currentSlideIndex, "Total slides:", slides.length);
    
    if (currentSlideIndex < slides.length) { 
        slides[currentSlideIndex](); 
    } else { 
        endProject(); 
    } 
}

function endProject() { 
    localStorage.setItem(STORAGE_KEY, "true"); 
    renderExitScreen(); 
}

function renderStartScreen() {
  app.innerHTML = `
    <div class="start-slide">
      <div class="start-bg"></div>

      <div class="start-card">
        <h1 class="start-title">Birthday Surprise</h1>

        <button class="start-btn" id="startBtn">
          Start
        </button>
      </div>
    </div>
  `;

  document.getElementById("startBtn").onclick = () => {
  slides[currentSlideIndex]();
  };

  if (!document.getElementById("start-style")) {
    const style = document.createElement("style");
    style.id = "start-style";
    style.textContent = `
      .start-slide {
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2a0837, #12061a);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .start-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle, rgba(255,105,180,0.25) 2px, transparent 3px);
        background-size: 55px 55px;
        animation: bgMove 35s linear infinite;
      }

      @keyframes bgMove {
        from { transform: translateY(0); }
        to { transform: translateY(-180px); }
      }

      .start-card {
        position: relative;
        z-index: 2;
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(14px);
        border-radius: 26px;
        padding: 40px 30px;
        text-align: center;
        width: 85%;
        max-width: 380px;
        box-shadow: 0 0 35px rgba(255,105,180,0.4);
      }

      .start-title {
        font-size: 1.9rem;
        margin-bottom: 30px;
        font-weight: 700;
        background: linear-gradient(90deg, #ff7eb3, #ffb3d9);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .start-btn {
        border: none;
        border-radius: 40px;
        padding: 12px 36px;
        font-size: 1.05rem;
        font-weight: 600;
        cursor: pointer;
        background: linear-gradient(135deg, #ff6fae, #c77dff);
        color: #fff;
        box-shadow: 0 6px 18px rgba(255,105,180,0.55);
        transition: transform .2s ease;
      }

      .start-btn:active {
        transform: scale(0.96);
      }
    `;
    document.head.appendChild(style);
  }
}

function balloonSlide() {
    console.log("Balloon slide (fireworks) loaded");
    
    app.innerHTML = `
        <div style="position: relative; width: 100%; height: 100vh; background: #111;">
            <canvas id="balloonCanvas"></canvas>
            <button class="secondary-btn" id="skipBalloon" 
                style="position: absolute; bottom: 30px; right: 30px; z-index: 10; background: rgba(0,0,0,0.5); color: white;">
                <i class="fa-solid fa-forward"></i> Skip
            </button>
        </div>
    `;

    const canvas = document.getElementById('balloonCanvas');
    
    // الكود الأصلي كما هو تماماً بدون تعديل
    let w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        ctx = canvas.getContext("2d"),
        hw = w / 2;
    (hh = h / 2),
    (opts = {
        // change the text in here //
        strings: ["HAPPY", "BIRTHDAY!", "ASSOUMY"],
        charSize: 30,
        charSpacing: 35,
        lineHeight: 40,

        cx: w / 2,
        cy: h / 2,

        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: 0.1,
        upFlow: -0.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 20,
        balloonAddedSize: 20,
        balloonBaseVel: 0.4,
        balloonAddedVel: 0.4,
        balloonBaseRadian: -(Math.PI / 2 - 0.5),
        balloonAddedRadian: -1,
    }),
    (calc = {
        totalWidth:
        opts.charSpacing *
        Math.max(opts.strings[0].length, opts.strings[1].length),
    }),
    (Tau = Math.PI * 2),
    (TauQuarter = Tau / 4),
    (letters = []);

    ctx.font = opts.charSize + "px Verdana";

    function Letter(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;

        this.dx = -ctx.measureText(char).width / 2;
        this.dy = +opts.charSize / 2;

        this.fireworkDy = this.y - hh;

        var hue = (x / calc.totalWidth) * 360;

        this.color = "hsl(hue,80%,50%)".replace("hue", hue);
        this.lightAlphaColor = "hsla(hue,80%,light%,alp)".replace("hue", hue);
        this.lightColor = "hsl(hue,80%,light%)".replace("hue", hue);
        this.alphaColor = "hsla(hue,80%,50%,alp)".replace("hue", hue);

        this.reset();
    }
    
    Letter.prototype.reset = function () {
        this.phase = "firework";
        this.tick = 0;
        this.spawned = false;
        this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
        this.reachTime =
            (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) |
            0;
        this.lineWidth =
            opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, hh, 0]];
    };
    
    Letter.prototype.step = function () {
        if (this.phase === "firework") {
            if (!this.spawned) {
                ++this.tick;
                if (this.tick >= this.spawningTime) {
                    this.tick = 0;
                    this.spawned = true;
                }
            } else {
                ++this.tick;

                var linearProportion = this.tick / this.reachTime,
                    armonicProportion = Math.sin(linearProportion * TauQuarter),
                    x = linearProportion * this.x,
                    y = hh + armonicProportion * this.fireworkDy;

                if (this.prevPoints.length > opts.fireworkPrevPoints)
                    this.prevPoints.shift();

                this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

                var lineWidthProportion = 1 / (this.prevPoints.length - 1);

                for (var i = 1; i < this.prevPoints.length; ++i) {
                    var point = this.prevPoints[i],
                        point2 = this.prevPoints[i - 1];

                    ctx.strokeStyle = this.alphaColor.replace(
                        "alp",
                        i / this.prevPoints.length
                    );
                    ctx.lineWidth = point[2] * lineWidthProportion * i;
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                }

                if (this.tick >= this.reachTime) {
                    this.phase = "contemplate";

                    this.circleFinalSize =
                        opts.fireworkCircleBaseSize +
                        opts.fireworkCircleAddedSize * Math.random();
                    this.circleCompleteTime =
                        (opts.fireworkCircleBaseTime +
                            opts.fireworkCircleAddedTime * Math.random()) |
                        0;
                    this.circleCreating = true;
                    this.circleFading = false;

                    this.circleFadeTime =
                        (opts.fireworkCircleFadeBaseTime +
                            opts.fireworkCircleFadeAddedTime * Math.random()) |
                        0;
                    this.tick = 0;
                    this.tick2 = 0;

                    this.shards = [];

                    var shardCount =
                            (opts.fireworkBaseShards +
                            opts.fireworkAddedShards * Math.random()) |
                        0,
                        angle = Tau / shardCount,
                        cos = Math.cos(angle),
                        sin = Math.sin(angle),
                        x = 1,
                        y = 0;

                    for (var i = 0; i < shardCount; ++i) {
                        var x1 = x;
                        x = x * cos - y * sin;
                        y = y * cos + x1 * sin;

                        this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
                    }
                }
            }
        } else if (this.phase === "contemplate") {
            ++this.tick;

            if (this.circleCreating) {
                ++this.tick2;
                var proportion = this.tick2 / this.circleCompleteTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor
                    .replace("light", 50 + 50 * proportion)
                    .replace("alp", proportion);
                ctx.beginPath();
                ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 > this.circleCompleteTime) {
                    this.tick2 = 0;
                    this.circleCreating = false;
                    this.circleFading = true;
                }
            } else if (this.circleFading) {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                ++this.tick2;
                var proportion = this.tick2 / this.circleFadeTime,
                    armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

                ctx.beginPath();
                ctx.fillStyle = this.lightAlphaColor
                    .replace("light", 100)
                    .replace("alp", 1 - armonic);
                ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
                ctx.fill();

                if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
            } else {
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
            }

            for (var i = 0; i < this.shards.length; ++i) {
                this.shards[i].step();

                if (!this.shards[i].alive) {
                    this.shards.splice(i, 1);
                    --i;
                }
            }

            if (this.tick > opts.letterContemplatingWaitTime) {
                this.phase = "balloon";

                this.tick = 0;
                this.spawning = true;
                this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
                this.inflating = false;
                this.inflateTime =
                    (opts.balloonBaseInflateTime +
                        opts.balloonAddedInflateTime * Math.random()) |
                    0;
                this.size =
                    (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

                var rad =
                        opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
                    vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

                this.vx = Math.cos(rad) * vel;
                this.vy = Math.sin(rad) * vel;
            }
        } else if (this.phase === "balloon") {
            ctx.strokeStyle = this.lightColor.replace("light", 80);

            if (this.spawning) {
                ++this.tick;
                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                if (this.tick >= this.spawnTime) {
                    this.tick = 0;
                    this.spawning = false;
                    this.inflating = true;
                }
            } else if (this.inflating) {
                ++this.tick;

                var proportion = this.tick / this.inflateTime,
                    x = (this.cx = this.x),
                    y = (this.cy = this.y - this.size * proportion);

                ctx.fillStyle = this.alphaColor.replace("alp", proportion);
                ctx.beginPath();
                generateBalloonPath(x, y, this.size * proportion);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, this.y);
                ctx.stroke();

                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

                if (this.tick >= this.inflateTime) {
                    this.tick = 0;
                    this.inflating = false;
                }
            } else {
                this.cx += this.vx;
                this.cy += this.vy += opts.upFlow;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                generateBalloonPath(this.cx, this.cy, this.size);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(this.cx, this.cy);
                ctx.lineTo(this.cx, this.cy + this.size);
                ctx.stroke();

                ctx.fillStyle = this.lightColor.replace("light", 70);
                ctx.fillText(this.char, this.cx + this.dx, this.cy + this.dy + this.size);

                if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw)
                    this.phase = "done";
            }
        }
    };
    
    function Shard(x, y, vx, vy, color) {
        var vel =
        opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

        this.vx = vx * vel;
        this.vy = vy * vel;

        this.x = x;
        this.y = y;

        this.prevPoints = [[x, y]];
        this.color = color;

        this.alive = true;

        this.size =
        opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
    }
    
    Shard.prototype.step = function () {
        this.x += this.vx;
        this.y += this.vy += opts.gravity;

        if (this.prevPoints.length > opts.fireworkShardPrevPoints)
            this.prevPoints.shift();

        this.prevPoints.push([this.x, this.y]);

        var lineWidthProportion = this.size / this.prevPoints.length;

        for (var k = 0; k < this.prevPoints.length - 1; ++k) {
            var point = this.prevPoints[k],
                point2 = this.prevPoints[k + 1];

            ctx.strokeStyle = this.color.replace("alp", k / this.prevPoints.length);
            ctx.lineWidth = k * lineWidthProportion;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
        }

        if (this.prevPoints[0][1] > hh) this.alive = false;
    };

    function generateBalloonPath(x, y, size) {
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
            x - size / 2,
            y - size / 2,
            x - size / 4,
            y - size,
            x,
            y - size
        );
        ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
    }

    // التعديل الوحيد: إضافة منطق للتحقق من انتهاء الدورة
    let animationId;
    let hasCompletedOnce = false;
    
    function anim() {
        animationId = window.requestAnimationFrame(anim);

        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, w, h);

        ctx.translate(hw, hh);

        var done = true;
        for (var l = 0; l < letters.length; ++l) {
            letters[l].step();
            if (letters[l].phase !== "done") done = false;
        }

        ctx.translate(-hw, -hh);

        // هنا التعديل: بعد انتهاء الدورة الأولى، توقف وانتقل للشريحة التالية
        if (done && !hasCompletedOnce) {
            hasCompletedOnce = true;
            
            // انتظر 2 ثانية ثم انتقل للشريحة التالية
            setTimeout(() => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
                nextSlide();
            }, 2000);
        }
        
        // لا تعيد التشغيل بعد الدورة الأولى
        if (done && hasCompletedOnce) {
            // فقط توقف الرسوم المتحركة
            cancelAnimationFrame(animationId);
        }
    }

    // تهيئة الحروف
    for (let i = 0; i < opts.strings.length; ++i) {
        for (var j = 0; j < opts.strings[i].length; ++j) {
            letters.push(
                new Letter(
                    opts.strings[i][j],
                    j * opts.charSpacing +
                        opts.charSpacing / 2 -
                        (opts.strings[i].length * opts.charSize) / 2,
                    i * opts.lineHeight +
                        opts.lineHeight / 2 -
                        (opts.strings.length * opts.lineHeight) / 2
                )
            );
        }
    }

    // بدء الرسوم المتحركة
    anim();

    // دالة handleResize للتعامل مع تغيير حجم النافذة
    function handleResize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

        hw = w / 2;
        hh = h / 2;

        ctx.font = opts.charSize + "px Verdana";
        
        // إعادة إنشاء الحروف بالأبعاد الجديدة
        letters = [];
        for (let i = 0; i < opts.strings.length; ++i) {
            for (var j = 0; j < opts.strings[i].length; ++j) {
                letters.push(
                    new Letter(
                        opts.strings[i][j],
                        j * opts.charSpacing +
                            opts.charSpacing / 2 -
                            (opts.strings[i].length * opts.charSize) / 2,
                        i * opts.lineHeight +
                            opts.lineHeight / 2 -
                            (opts.strings.length * opts.lineHeight) / 2
                    )
                );
            }
        }
    }
    
    window.addEventListener("resize", handleResize);

    // زر التخطي
    document.getElementById("skipBalloon").addEventListener("click", () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        nextSlide();
    });
}

function heartSlide() {
    console.log("Heart slide loaded");
    
    app.innerHTML = `
        <div style="position: relative; width: 100%; height: 100vh; background: linear-gradient(to bottom, #1a0a1f, #0a0515);">
            <canvas id="heartCanvas"></canvas>
            <button class="secondary-btn" id="nextFromHeart"
                style="position:absolute; bottom:40px; left:50%; transform:translateX(-50%); z-index:10; 
                       background: rgba(255, 105, 180, 0.2); border: 2px solid #ff69b4; color: white;">
                <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
        </div>
    `;

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    
    // ضبط حجم الكانفاس
    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const heartSize = Math.min(window.innerWidth, window.innerHeight) * 0.4;
    
    // معادلة القلب البارامترية الصحيحة
    function heartPoint(t, size = 1) {
        // المعادلة: x = 16 sin³(t), y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        return {
            x: centerX + x * heartSize * 0.04 * size,
            y: centerY + y * heartSize * 0.04 * size
        };
    }
    
    // إنشاء جسيمات القلب
    const particles = [];
    const particleCount = 600;
    
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random() * Math.PI * 2;
        const size = 0.5 + Math.random() * 0.5;
        const point = heartPoint(t, size);
        
        particles.push({
            x: point.x,
            y: point.y,
            originalX: point.x,
            originalY: point.y,
            size: 2 + Math.random() * 2,
            color: `hsl(${330 + Math.random() * 30}, ${80 + Math.random() * 20}%, ${70 + Math.random() * 20}%)`,
            speed: 0.002 + Math.random() * 0.003,
            angle: t,
            orbitRadius: 5 + Math.random() * 15,
            timeOffset: Math.random() * Math.PI * 2
        });
    }
    
    // تفاعل الماوس
    let mouseX = centerX;
    let mouseY = centerY;
    let isInteracting = false;
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isInteracting = true;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isInteracting = true;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouseX = centerX;
        mouseY = centerY;
        isInteracting = false;
    });
    
    let animationId;
    let time = 0;
    let glowPhase = 0;
    
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        // مسح الشاشة بخلفية شفافة
        ctx.fillStyle = 'rgba(26, 10, 31, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.01;
        glowPhase += 0.03;
        
        // تحديث ورسم الجسيمات
        particles.forEach(particle => {
            // حركة مدارية حول نقطة القلب الأصلية
            particle.angle += particle.speed;
            
            // حساب الموضع المستهدف مع حركة مدارية
            const orbitX = Math.cos(particle.angle + particle.timeOffset) * particle.orbitRadius;
            const orbitY = Math.sin(particle.angle + particle.timeOffset) * particle.orbitRadius;
            
            // الموضع المستهدف (القلب + مدار)
            const targetPoint = heartPoint(particle.angle, 0.8);
            const targetX = targetPoint.x + orbitX;
            const targetY = targetPoint.y + orbitY;
            
            // تأثير الماوس
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (isInteracting && distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(dy, dx);
                
                particle.x += Math.cos(angle) * force * 3;
                particle.y += Math.sin(angle) * force * 3;
            } else {
                // العودة للهدف (قلب + مدار)
                particle.x += (targetX - particle.x) * 0.05;
                particle.y += (targetY - particle.y) * 0.05;
            }
            
            // حركة نابضية خفيفة
            const pulse = Math.sin(time + particle.timeOffset) * 0.5 + 0.5;
            const currentSize = particle.size * (0.8 + pulse * 0.2);
            
            // رسم الجسيم مع توهج
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentSize * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.7, particle.color.replace(')', ', 0.6)').replace('hsl', 'hsla'));
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // نقطة مركزية ساطعة
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });
        
        // رسم الحرف A الجميل
        drawLetterA();
        
        // رسم خطوط بين الجسيمات القريبة
        if (!isInteracting) {
            drawConnections();
        }
    }
    
    function drawLetterA() {
        ctx.save();
        
        const fontSize = heartSize * 0.6;
        ctx.font = `bold ${fontSize}px 'Arial', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // تدرج لوني للحرف
        const gradient = ctx.createLinearGradient(
            centerX - heartSize * 0.3,
            centerY,
            centerX + heartSize * 0.3,
            centerY
        );
        gradient.addColorStop(0, '#ffb6c1');
        gradient.addColorStop(0.5, '#ff69b4');
        gradient.addColorStop(1, '#ff1493');
        
        // تأثير توهج متحرك
        const glowSize = 25 + Math.sin(glowPhase) * 10;
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = glowSize;
        
        // رسم الحرف
        ctx.fillStyle = gradient;
        ctx.fillText('A', centerX, centerY);
        
        // تأثير حدود
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('A', centerX, centerY);
        
        ctx.restore();
    }
    
    function drawConnections() {
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.1)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i += 2) {
            for (let j = i + 1; j < Math.min(i + 10, particles.length); j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 50) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // بدء الرسوم المتحركة
    animate();
    
    // زر الانتقال
    document.getElementById('nextFromHeart').addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
        nextSlide();
    });

}

async function renderRomanticCardsSlide() {
  try {
    /* ===== Load JSON ===== */
    const res = await fetch("data/cards.json");
    const data = await res.json();
    const cards = data.cards;

    /* ===== Inject HTML ===== */
    app.innerHTML = `
      <div class="romantic-slide-container">
        <div class="floating-animation-layer"></div>

        <div class="romantic-slide-wrapper">
          <div class="romantic-slide-content">
            ${cards.map((card, i) => `
              <div class="romantic-card ${i === 0 ? "active-card" : i === 1 ? "next-card" : ""}" data-card="${i}">
                <div class="card-label">${card.label}</div>

                <div class="card-content">
                  <h2 class="romantic-title">${card.title}</h2>

                  <p class="romantic-message">
                    ${card.text.map(line => line === "" ? "<br>" : `${line}<br>`).join("")}
                  </p>

                  <div class="signature">${card.signature}</div>

                  <button class="${i === 0 ? "card-switch-btn" : "next-slide-btn"}" data-action="${i}">
                    ${card.button}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    /* ===== Inject CSS ===== */
    const style = document.createElement("style");
    style.textContent = `
      /* تأثيرات خلفية وتحريك */
      .romantic-slide-container {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #2b0a3d, #4b145f);
        perspective: 1200px;
      }

      .romantic-slide-container .floating-animation-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }

      .romantic-slide-container .floating-dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(255,182,193,.9), transparent 70%);
        border-radius: 50%;
        animation: floatUp linear infinite;
        opacity: .6;
      }

      @keyframes floatUp {
        from { transform: translateY(100vh); opacity: 0; }
        to   { transform: translateY(-20vh); opacity: 1; }
      }

      /* Wrapper جديد لمحاذاة المركز */
      .romantic-slide-container .romantic-slide-wrapper {
        position: relative;
        z-index: 5;
        width: 90%;
        max-width: 620px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* الحاوية الرئيسية للبطاقات */
      .romantic-slide-container .romantic-slide-content {
        position: relative;
        width: 100%;
        height: 100%;
      }

      /* تصميم البطاقة */
      .romantic-slide-container .romantic-card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95) rotateY(10deg);
        width: 100%;
        height: auto;
        min-height: 450px;
        background: rgba(255,255,255,.12);
        backdrop-filter: blur(16px);
        border-radius: 30px;
        padding: 40px 30px;
        text-align: center;
        transform-style: preserve-3d;
        opacity: 0;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 12px 40px rgba(255,105,180,.35);
        border: 1px solid rgba(255,182,193,.25);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      /* البطاقة النشطة (مركز الشاشة) */
      .romantic-slide-container .romantic-card.active-card {
        opacity: 1;
        pointer-events: auto;
        z-index: 10;
        transform: translate(-50%, -50%) scale(1) rotateY(0deg);
      }

      /* البطاقة التالية (جاهزة للدخول من اليمين) */
      .romantic-slide-container .romantic-card.next-card {
        opacity: 0;
        z-index: 5;
        transform: translate(150%, -50%) scale(0.95) rotateY(10deg);
      }

      /* البطاقة السابقة (تخرج إلى اليسار) */
      .romantic-slide-container .romantic-card.prev-card {
        opacity: 0;
        z-index: 4;
        transform: translate(-250%, -50%) scale(0.9) rotateY(-10deg);
      }

      .romantic-slide-container .card-label {
        position: absolute;
        top: 12px;
        right: 16px;
        font-size: 0.7rem;
        padding: 3px 10px;
        background: rgba(255, 182, 193, 0.2);
        color: #ffb6c1;
        border-radius: 20px;
        opacity: 0.65;
        backdrop-filter: blur(6px);
      }

      .romantic-slide-container .romantic-title {
        font-size: 2.2rem;
        margin-bottom: 20px;
        background: linear-gradient(90deg,#ff7eb3,#ffb3d9,#c9a0dc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 800;
      }

      .romantic-slide-container .romantic-message {
        font-size: 1.25rem;
        line-height: 1.9;
        color: rgba(255,255,255,.95);
        margin-bottom: 25px;
        letter-spacing: 0.3px;
      }

      .romantic-slide-container .signature {
        font-size: 1.4rem;
        font-weight: 700;
        color: #ffd166;
        margin-bottom: 25px;
      }

      /* أزرار مخصصة للشريحة فقط */
      .romantic-slide-container button {
        border: none;
        border-radius: 50px;
        padding: 12px 30px;
        font-size: 1.05rem;
        font-weight: 600;
        cursor: pointer;
        background: linear-gradient(135deg,#ff7eb3,#b967ff);
        color: #fff;
        transition: .3s;
        box-shadow: 0 6px 20px rgba(255,105,180,.45);
        margin-top: auto;
        align-self: center;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
      }

      .romantic-slide-container button:hover {
        transform: translateY(-3px) scale(1.05);
      }

      .romantic-slide-container .card-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);

    /* ===== Card Logic ===== */
    const cardsEls = document.querySelectorAll(".romantic-card");
    let currentCard = 0;

    document.querySelectorAll("button[data-action]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = Number(btn.dataset.action);

        if (index === 0) {
          // تبديل من البطاقة الأولى إلى الثانية
          cardsEls[0].classList.remove("active-card");
          cardsEls[0].classList.add("prev-card");
          
          cardsEls[1].classList.remove("next-card");
          cardsEls[1].classList.add("active-card");
          
          currentCard = 1;
          
        } else if (index === 1) {
          // عند النقر على زر "Next Slide" في البطاقة الثانية
          console.log("Next slide clicked - should go to next slide");
          
          // التأكد من أن nextSlideCallback موجودة ويمكن استدعاؤها
          if (typeof nextSlideCallback === "function") {
            console.log("Calling nextSlideCallback");
            nextSlideCallback();
          } else {
            console.error("nextSlideCallback is not defined or not a function");
            nextSlide();
            // renderNextSlide(); // إذا كان لديك دالة أخرى
          }
        }
      });
    });

    /* ===== Floating Background ===== */
    const layer = document.querySelector(".floating-animation-layer");
    for (let i = 0; i < 22; i++) {
      const dot = document.createElement("div");
      dot.className = "floating-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.animationDuration = (10 + Math.random() * 15) + "s";
      dot.style.animationDelay = (Math.random() * 5) + "s";
      layer.appendChild(dot);
    }

  } catch (err) {
    console.error("Romantic slide failed:", err);
  }
}

function cakeSlide() {
    console.log("Cake slide loaded");
    // For debugging hit areas
     window.debugMode = true;
    
    app.innerHTML = `
    <style>
    .cake-hint {
  position: absolute;
  bottom: 40px;          /* بأسفل الشاشة مع مسافة لطيفة */
  left: 50%;
  transform: translateX(-50%);
  
  padding: 12px 22px;
  max-width: 90%;
  text-align: center;

  font-size: 1rem;
  font-weight: 500;
  font-family: "Cairo", "Tajawal", system-ui, sans-serif;

  color: #000;
  background: rgba(255, 105, 180, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-radius: 18px;
  box-shadow:
    0 8px 25px rgba(255, 105, 180, 0.25),
    inset 0 0 0 1px rgba(255, 182, 213, 0.25);

  animation: hintFloat 3s ease-in-out infinite;
  z-index: 50;
}

/* حركة خفيفة رومانسية */
@keyframes hintFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.85;
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
    opacity: 1;
  }
}
    </style>
        <div style="position: relative; width: 100%; height: 100vh; 
             background: linear-gradient(135deg, #FFF5F8 0%, #FFE0ED 40%, #FFD1DC 70%, #FFC8DD 100%);
             display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <canvas id="cakeCanvas"></canvas>
            <button class="secondary-btn" id="nextFromCake"
                style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); 
                       display: none; z-index: 10; background: rgba(255, 105, 180, 0.2); 
                       border: 2px solid #ff69b4; color: #ff1493;z-index: 999;">
                <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
          <p class="cake-hint">
  أسوووومي 🙂 اكبسي على الشعلات فوق الشموع
</p>
        </div>
    `;

    const canvas = document.getElementById('cakeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to be responsive
    function resizeCanvas() {
        canvas.width = Math.min(window.innerWidth, 800);
        canvas.height = Math.min(window.innerHeight, 700);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Cake and candle state
    const candles = [
        { x: 0.3, lit: true, opacity: 1, flameOffset: 0 },
        { x: 0.42, lit: true, opacity: 1, flameOffset: 0.5 },
        { x: 0.54, lit: true, opacity: 1, flameOffset: 1 },
        { x: 0.66, lit: true, opacity: 1, flameOffset: 1.5 },
        { x: 0.78, lit: true, opacity: 1, flameOffset: 2 }
    ];
    
    let messageOpacity = 0;
    let messageGlow = 0;
    let time = 0;
    let allCandlesOut = false;
    
    // Draw the elegant cake with new colors
    function drawCake() {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const cakeLeft = centerX - cakeWidth / 2;
        
        // Bottom layer - لون كريمي فاتح
        ctx.fillStyle = '#FFF0F6';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft, canvas.height * 0.55, cakeWidth, canvas.height * 0.12, [0, 0, 8, 8]);
        ctx.fill();
        
        // Middle layer - لون خوخي ناعم  
        ctx.fillStyle = '#FFD1DC';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft + cakeWidth * 0.08, canvas.height * 0.48, cakeWidth * 0.84, canvas.height * 0.12, [0, 0, 6, 6]);
        ctx.fill();
        
        // Top layer - لون وردي مشع
        ctx.fillStyle = '#FF8FA3';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft + cakeWidth * 0.15, canvas.height * 0.41, cakeWidth * 0.7, canvas.height * 0.12, [8, 8, 4, 4]);
        ctx.fill();
        
        // "20 years" text on cake
        ctx.fillStyle = '#ff69b4';
        ctx.font = `${canvas.width * 0.04}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('20 years', centerX, canvas.height * 0.47);
    }
    
    // Helper function to draw rounded rectangles
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        if (typeof radius === 'number') {
            radius = [radius, radius, radius, radius];
        }
        
        ctx.moveTo(x + radius[0], y);
        ctx.lineTo(x + width - radius[1], y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius[1]);
        ctx.lineTo(x + width, y + height - radius[2]);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius[2], y + height);
        ctx.lineTo(x + radius[3], y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius[3]);
        ctx.lineTo(x, y + radius[0]);
        ctx.quadraticCurveTo(x, y, x + radius[0], y);
        ctx.closePath();
    }
    
    // Draw candles
    function drawCandles() {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;
        
        candles.forEach((candle, index) => {
            const x = centerX - cakeWidth / 2 + cakeWidth * candle.x;
            
            // Candle stick
            ctx.fillStyle = candle.lit ? '#ffb3d9' : '#d4a5bb';
            ctx.fillRect(x - 2, candleY - 35, 4, 35);
            
            // Decorative stripe on candle
            ctx.fillStyle = '#ff87c7';
            ctx.fillRect(x - 2, candleY - 15, 4, 3);
            
            // Flame
            if (candle.lit && candle.opacity > 0) {
                const flicker = Math.sin(time * 3 + candle.flameOffset) * 2;
                const flameY = candleY - 38 + flicker;
                
                // Glow effect
                const gradient = ctx.createRadialGradient(x, flameY, 0, x, flameY, 15);
                gradient.addColorStop(0, `rgba(255, 200, 100, ${candle.opacity * 0.6})`);
                gradient.addColorStop(0.5, `rgba(255, 150, 80, ${candle.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(255, 150, 80, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, flameY, 15, 0, Math.PI * 2);
                ctx.fill();
                
                // Flame shape
                ctx.fillStyle = `rgba(255, 180, 100, ${candle.opacity})`;
                ctx.beginPath();
                ctx.moveTo(x, flameY - 8);
                ctx.bezierCurveTo(x - 4, flameY - 4, x - 4, flameY + 2, x, flameY + 4);
                ctx.bezierCurveTo(x + 4, flameY + 2, x + 4, flameY - 4, x, flameY - 8);
                ctx.fill();
                
                // Inner flame
                ctx.fillStyle = `rgba(255, 220, 150, ${candle.opacity})`;
                ctx.beginPath();
                ctx.ellipse(x, flameY, 2, 4, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    
    // Draw birthday message
    function drawMessage() {
        if (messageOpacity > 0) {
            const centerX = canvas.width / 2;
            const messageY = canvas.height * 0.28;
            
            // Glow effect
            ctx.shadowBlur = 20 + messageGlow * 10;
            ctx.shadowColor = `rgba(255, 179, 217, ${messageOpacity * 0.8})`;
            
            // Main message with gradient
            const gradient = ctx.createLinearGradient(
                centerX - 150, messageY,
                centerX + 150, messageY + 30
            );
            gradient.addColorStop(0, '#ff69b4');
            gradient.addColorStop(0.5, '#ff1493');
            gradient.addColorStop(1, '#ff0066');
            
            ctx.fillStyle = gradient;
            ctx.font = `bold ${canvas.width * 0.055}px 'Georgia', 'Segoe UI', serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Happy Birthday', centerX, messageY);
            ctx.fillText('My Sweetheart', centerX, messageY + canvas.width * 0.07);
            
            ctx.shadowBlur = 0;
        }
    }
    
    let cakeAnimationId;
    
    // Animation loop
    function animateCake() {
        time += 0.016;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw components
        drawCake();
        drawCandles();
        
        // Check if all candles are out
        const allOut = candles.every(c => !c.lit);
        if (allOut && !allCandlesOut) {
            allCandlesOut = true;
        }
        
        // Animate message
        if (allCandlesOut) {
            if (messageOpacity < 1) {
                messageOpacity += 0.015;
                messageGlow = Math.sin(time * 2) * 0.5 + 0.5;
            } else {
                messageGlow = Math.sin(time * 2) * 0.5 + 0.5;
                // Show next button
                const nextButton = document.getElementById('nextFromCake');
                if (nextButton) {
                    nextButton.style.display = 'flex';
                }
            }
        }
        
        drawMessage();
        
        // Fade out candles
        candles.forEach(candle => {
            if (!candle.lit && candle.opacity > 0) {
                candle.opacity -= 0.02;
                if (candle.opacity < 0) candle.opacity = 0;
            }
        });
        
        cakeAnimationId = requestAnimationFrame(animateCake);
    }
    
    // Handle interaction - FIXED VERSION
    function handleInteraction(x, y) {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;
        
        candles.forEach(candle => {
            const candleX = centerX - cakeWidth / 2 + cakeWidth * candle.x;
            
            // Calculate distance from click to candle flame position
            const distance = Math.sqrt(Math.pow(x - candleX, 2) + Math.pow(y - (candleY - 38), 2));
            
            if (distance < 25 && candle.lit) {
                candle.lit = false;
                console.log("🔥 Candle blown!");
            }
        });
    }
    
    // Mouse/touch events - FIXED
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;    // Relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height;  // Relationship bitmap vs. element for Y
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        handleInteraction(x, y);
    });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;
        
        handleInteraction(x, y);
    }, { passive: false });
    
    // Add visual feedback when hovering over candles
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;
        
        let isOverCandle = false;
        candles.forEach(candle => {
            if (candle.lit) {
                const candleX = centerX - cakeWidth / 2 + cakeWidth * candle.x;
                const distance = Math.sqrt(Math.pow(x - candleX, 2) + Math.pow(y - (candleY - 38), 2));
                
                if (distance < 25) {
                    isOverCandle = true;
                }
            }
        });
        
        // Change cursor when over candle
        canvas.style.cursor = isOverCandle ? 'pointer' : 'default';
    });
    
    // Start animation
    animateCake();
    
    // Add roundRect method if not exists
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        };
    }
    
    // Next button event listener
    setTimeout(() => {
        const nextButton = document.getElementById('nextFromCake');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                cancelAnimationFrame(cakeAnimationId);
                window.removeEventListener('resize', resizeCanvas);
                nextSlide();
            });
        }
    }, 100);
    

}

async function gallerySlide() {
    console.log("Gallery slide loaded");
    
    // First show loading screen
    app.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f7f7f7 0%, #eef2f3 100%);">
            <div style="font-size: 24px; color: #ff69b4; margin-bottom: 20px;">
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>
            <p style="color: #666; font-size: 18px;">Loading memories...</p>
        </div>
    `;

    try {
        // Try to load from JSON first
        let memories;
        try {
            const res = await fetch('data/memories.json');
            if (!res.ok) throw new Error('Failed to fetch JSON');
            memories = await res.json();
            console.log("JSON loaded successfully:", memories);
        } catch (fetchError) {
            console.log("Using fallback memories data:", fetchError);
            // Fallback data with working Unsplash URLs
            memories = [
                {
                    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop&q=80",
                    caption: "Beautiful moments we shared together"
                },
                {
                    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&h=600&fit=crop&q=80",
                    caption: "Special times filled with laughter"
                },
                {
                    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
                    caption: "Unforgettable memories that last forever"
                },
                {
                    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop&q=80",
                    caption: "Cherished moments of happiness"
                },
                {
                    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&q=80",
                    caption: "Beautiful journey together"
                }
            ];
        }

        // Now render the gallery
        app.innerHTML = `
            <div class="gallery-container" style="
                position: relative;
                width: 90vw;
                max-width: 900px;
                height: 75vh;
                max-height: 650px;
                perspective: 1200px;
                margin: 20px auto;
                overflow: hidden;
                animation: fadeInUp 0.8s ease-out;
            ">
                <div class="carousel-wrapper" style="
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                ">
                    <div class="carousel-inner" style="
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
                    "></div>
                </div>

                <button class="nav-btn prev-btn" aria-label="Previous" style="
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20px;
                    width: 60px;
                    height: 60px;
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    color: #ff69b4;
                    font-size: 1.6em;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    z-index: 20;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <button class="nav-btn next-btn" aria-label="Next" style="
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    border-radius: 50%;
                    color: #ff69b4;
                    font-size: 1.6em;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    z-index: 20;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <div class="counter" style="
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    background-color: rgba(255, 255, 255, 0.92);
                    color: #ff69b4;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                    z-index: 15;
                ">1 / ${memories.length}</div>

                <div class="caption-container" style="
                    position: absolute;
                    bottom: 30px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    z-index: 15;
                ">
                    <div class="caption" style="
                        text-align: center;
                        font-size: 1.1rem;
                        line-height: 1.6;
                        color: #333;
                        padding: 18px 30px;
                        background-color: rgba(255, 255, 255, 0.92);
                        border-radius: 15px;
                        backdrop-filter: blur(15px);
                        -webkit-backdrop-filter: blur(15px);
                        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
                        z-index: 15;
                        max-width: 80%;
                        
                        transform: translateY(20px);
                        transition: all 0.5s ease;
                        font-weight: 500;
                    ">${memories[0].caption}</div>
                </div>

                <button class="finish-gallery-btn" style="
                    position: absolute;
                    bottom: 100px;
                    right: 130px;
                    padding: 14px 28px;
                    font-size: 1rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, #ff69b4, #ff1493);
                    color: white;
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 100;
                    box-shadow: 0 10px 25px rgba(255, 105, 180, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    opacity: 1;
                    transform: translateY(0);
                ">
                    <i class="fas fa-heart"></i> Finish Show
                </button>
            </div>

            <style>
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .carousel-item {
                    position: absolute;
                    width: 85%;
                    height: 85%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border-radius: 16px;
                    box-shadow: 
                        0 15px 40px rgba(0, 0, 0, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                    opacity: 0.7;
                    transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
                    overflow: hidden;
                    cursor: pointer;
                    padding: 15px;
                }

                .carousel-item .image-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius: 12px;
                }

                .carousel-item .image-container img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    border-radius: 10px;
                    display: block;
                }

                .carousel-item.active {
                    transform: translateZ(0) rotateY(0deg) scale(1.05);
                    opacity: 1;
                    z-index: 10;
                    box-shadow: 
                        0 25px 60px rgba(0, 0, 0, 0.2),
                        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
                }

                .carousel-item.active .image-container img {
                    transform: scale(1.02);
                    transition: transform 0.3s ease;
                }

                .carousel-item.prev {
                    transform: translateZ(-400px) rotateY(-35deg) scale(0.85);
                    opacity: 0.6;
                    z-index: 5;
                    filter: brightness(0.8);
                }

                .carousel-item.next {
                    transform: translateZ(-400px) rotateY(35deg) scale(0.85);
                    opacity: 0.6;
                    z-index: 5;
                    filter: brightness(0.8);
                }

                .nav-btn:hover {
                    background-color: #ff69b4;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 12px 30px rgba(255, 105, 180, 0.3);
                }

                .caption.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .finish-gallery-btn.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .finish-gallery-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(255, 105, 180, 0.4);
                    background: linear-gradient(135deg, #ff1493, #ff0066);
                }

                @media (max-width: 768px) {
                    .gallery-container {
                        width: 95vw;
                        height: 65vh;
                    }

                    .carousel-item {
                        width: 90%;
                        height: 90%;
                        padding: 10px;
                    }

                    .nav-btn {
                        width: 50px;
                        height: 50px;
                        font-size: 1.3em;
                    }

                    .prev-btn {
                        left: 10px;
                    }

                    .next-btn {
                        right: 10px;
                    }

                    .caption {
    opacity: 1;
    transform: translateY(0);
    transition: transform 0.35s ease, opacity 0.35s ease;
    will-change: transform;
}

                    .counter {
                        top: 15px;
                        right: 15px;
                        padding: 8px 16px;
                        font-size: 0.85rem;
                    }

                    .finish-gallery-btn {
                        bottom: 20px;
                        right: 20px;
                        padding: 12px 22px;
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .gallery-container {
                        height: 60vh;
                    }

                    .nav-btn {
                        width: 45px;
                        height: 45px;
                        font-size: 1.2em;
                    }

                    .caption {
                        font-size: 0.9rem;
                        padding: 12px 18px;
                    }

                    .finish-gallery-btn {
                        padding: 10px 18px;
                        font-size: 0.85rem;
                    }
                }
            </style>
        `;

        // Initialize the gallery
        initGallery(memories);

    } catch (error) {
        console.error("Error in gallery:", error);
        // Show error message
        app.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; padding: 40px; text-align: center;">
                <h2 style="color: #ff69b4; margin-bottom: 20px;">Memory Gallery</h2>
                <p style="opacity: 0.7; margin: 20px 0;">Unable to load the gallery. ${error.message}</p>
                <button class="primary-btn" onclick="endProject()" style="
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #ff69b4, #ff1493);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    <i class="fa-solid fa-heart"></i> Finish Anyway
                </button>
            </div>
        `;
    }

    function initGallery(memories) {
        const carouselInner = document.querySelector('.carousel-inner');
        const caption = document.querySelector('.caption');
        const counter = document.querySelector('.counter');
        const finishBtn = document.querySelector('.finish-gallery-btn');
        
        let items = [];
        let currentIndex = 0;
        let hasInteracted = false;

        // Create carousel items
        memories.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'carousel-item';
            itemEl.dataset.index = index;
            itemEl.dataset.caption = item.caption;
            
            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            // Create image element
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.caption;
            img.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 10px;
                display: block;
            `;
            
            // Preload image with error handling
            const preloadImg = new Image();
            preloadImg.src = item.image;
            preloadImg.onload = () => {
                console.log(`Image ${index + 1} loaded successfully`);
                // If image is too small, add some styling
                if (preloadImg.width < 400 || preloadImg.height < 300) {
                    img.style.border = '1px solid #eee';
                    img.style.padding = '10px';
                    img.style.backgroundColor = '#f9f9f9';
                }
            };
            preloadImg.onerror = () => {
                console.error(`Failed to load image ${index + 1}: ${item.image}`);
                imageContainer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ff69b4; padding: 20px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📷</div>
                        <div style="font-size: 1.2rem; font-weight: 600;">Memory ${index + 1}</div>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">${item.caption}</div>
                    </div>
                `;
            };
            
            imageContainer.appendChild(img);
            itemEl.appendChild(imageContainer);
            
            // Set positions
            if (index === 0) {
                itemEl.classList.add('active');
            } else if (index === 1) {
                itemEl.classList.add('next');
            } else if (index === memories.length - 1) {
                itemEl.classList.add('prev');
            }

            carouselInner.appendChild(itemEl);
            items.push(itemEl);
        });

        // Initialize caption and counter
        updateDisplay();

        // Navigation functions
        function goToIndex(index) {
            // Remove classes from all
            items.forEach(item => item.classList.remove('active', 'prev', 'next'));

            // Set new active
            const newIndex = ((index % memories.length) + memories.length) % memories.length;
            items[newIndex].classList.add('active');

            // Set previous and next
            const prevIndex = (newIndex - 1 + memories.length) % memories.length;
            const nextIndex = (newIndex + 1) % memories.length;

            items[prevIndex].classList.add('prev');
            items[nextIndex].classList.add('next');

            // Update display
            currentIndex = newIndex;
            updateDisplay();

            // Show finish button after first interaction
            if (!hasInteracted) {
                setTimeout(() => {
                    finishBtn.classList.add('visible');
                }, 500);
                hasInteracted = true;
            }
        }

        function updateDisplay() {
            // Update caption
            const captionText = items[currentIndex].dataset.caption;
            caption.textContent = captionText;
            caption.classList.add('visible');
            
            // Update counter
            counter.textContent = `${currentIndex + 1} / ${memories.length}`;
            
            // Remove visible class after animation
         
        }

        // Button click handlers
        document.querySelector('.next-btn').addEventListener('click', () => {
            goToIndex(currentIndex + 1);
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            goToIndex(currentIndex - 1);
        });

        // Click on image to advance
        carouselInner.addEventListener('click', (e) => {
            if (e.target.closest('.carousel-item')) {
                goToIndex(currentIndex + 1);
            }
        });

        // Swipe gesture support
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left → next
                    goToIndex(currentIndex + 1);
                } else {
                    // Swipe right → previous
                    goToIndex(currentIndex - 1);
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                goToIndex(currentIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                goToIndex(currentIndex - 1);
            }
        });

        // NO AUTO ROTATION - تم إزالة الدوران التلقائي
        
        // Finish button click
        finishBtn.addEventListener('click', () => {
            console.log("Finish button clicked");
            endProject();
        });

        // Show finish button after 10 seconds if no interaction
        
    }
}

function renderExitScreen() {
    console.log("Exit screen loaded");
    
    app.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The End of Slides</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1a0a1e, #2d0f3a);
                    color: #fff;
                    min-height: 100vh;
                    overflow: hidden;
                    position: relative;
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    position: relative;
                    z-index: 10;
                }

                .header {
                    text-align: center;
                    padding: 3rem 0 2rem;
                    animation: fadeIn 1.5s ease-out forwards;
                    opacity: 0;
                }

                .title {
                    font-size: 3.5rem;
                    font-weight: 300;
                    letter-spacing: 2px;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #f8a5c2, #f78fb3, #d6a2e8);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-shadow: 0 2px 10px rgba(248, 165, 194, 0.2);
                }

                .subtitle {
                    font-size: 1.2rem;
                    opacity: 0.8;
                    font-weight: 300;
                    letter-spacing: 1px;
                }

                .messages-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 0;
                    overflow-y: auto;
                    max-height: 50vh;
                    margin-bottom: 1.5rem;
                }

                .messages-container::-webkit-scrollbar {
                    width: 6px;
                }

                .messages-container::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .messages-container::-webkit-scrollbar-thumb {
                    background: rgba(248, 165, 194, 0.4);
                    border-radius: 10px;
                }

                .message {
                    font-size: 1.5rem;
                    line-height: 1.8;
                    text-align: center;
                    max-width: 700px;
                    margin: 1.5rem 0;
                    padding: 1.5rem;
                    border-radius: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                    transform: translateY(20px);
                    opacity: 0;
                    animation: slideUp 0.8s ease-out forwards;
                }

                .message:nth-child(1) { animation-delay: 0.5s; }
                .message:nth-child(2) { animation-delay: 0.7s; }
                .message:nth-child(3) { animation-delay: 0.9s; }
                .message:nth-child(4) { animation-delay: 1.1s; }
                .message:nth-child(5) { animation-delay: 1.3s; }

                .message-text {
                    background: linear-gradient(to right, #fbc2eb, #a6c1ee);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                .closing-message {
                    text-align: center;
                    font-size: 2rem;
                    margin: 1.5rem 0;
                    padding: 1.5rem;
                    border-radius: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                    transform: translateY(20px);
                    opacity: 0;
                    animation: slideUp 0.8s ease-out 1.5s forwards;
                    color: #fbc2eb;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                }

                .controls {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    padding: 1rem 0 2rem;
                    margin-top: auto;
                    position: sticky;
                    bottom: 0;
                    background: linear-gradient(to top, rgba(26, 10, 30, 0.9), transparent);
                    padding-top: 1rem;
                }

                .btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #f8a5c2;
                    padding: 0.8rem 2rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                    font-weight: 500;
                }

                .btn:hover {
                    background: rgba(248, 165, 194, 0.2);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(248, 165, 194, 0.3);
                }

                .btn:active {
                    transform: translateY(1px);
                }

                .heart-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .signature {
                    text-align: center;
                    font-size: 1.5rem;
                    opacity: 0.7;
                    margin-top: 2rem;
                    font-style: italic;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .title {
                        font-size: 2.5rem;
                    }
                    
                    .subtitle {
                        font-size: 1rem;
                    }
                    
                    .message {
                        font-size: 1.2rem;
                        padding: 1rem;
                    }
                    
                    .closing-message {
                        font-size: 1.5rem;
                    }
                    
                    .controls {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .btn {
                        width: 80%;
                        justify-content: center;
                    }
                    
                    .signature {
                        font-size: 1.2rem;
                    }
                }

                @media (max-width: 480px) {
                    .title {
                        font-size: 2rem;
                    }
                    
                    .message {
                        font-size: 1rem;
                    }
                    
                    .closing-message {
                        font-size: 1.2rem;
                    }
                    
                    .container {
                        padding: 1rem;
                    }
                }
            </style>
        </head>
        <body>
            <canvas class="heart-canvas" id="heartCanvas"></canvas>
            
            <div class="container">
                <header class="header">
                    <h1 class="title">Thank You ASSOUMY </h1>
                    <p class="subtitle">For sharing this special moment</p>
                </header>
                
                <div class="messages-container" id="messagesContainer">
                    <!-- Messages will be loaded here -->
                </div>
                
                <div class="closing-message">
                    𓆩𝘼𓆪 علوش 💗 أسومي 𓆩𝘼𓆪
                </div>
                
                
                <div class="controls">
                    <button class="btn" id="replayBtn">
                        <i class="fas fa-redo"></i> Watch Again
                    </button>
                    <button class="btn" id="exitBtn">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </body>
        </html>
    `;
                // Background Animation Module
                class HeartBackground {
                    constructor() {
                        this.canvas = document.getElementById('heartCanvas');
                        this.ctx = this.canvas.getContext('2d');
                        this.hearts = [];
                        this.rafId = null;
                        
                        this.resizeCanvas();
                        window.addEventListener('resize', () => this.resizeCanvas());
                        
                        this.startAnimation();
                    }
                    
                    resizeCanvas() {
                        this.canvas.width = window.innerWidth;
                        this.canvas.height = window.innerHeight;
                    }
                    
                    createHeart() {
                        const size = Math.random() * 30 + 10;
                        return {
                            x: Math.random() * this.canvas.width,
                            y: this.canvas.height + size,
                            size: size,
                            speed: Math.random() * 2 + 1,
                            opacity: Math.random() * 0.5 + 0.3,
                            color: this.getRandomHeartColor(),
                            sway: Math.random() * 2 - 1,
                            swayOffset: Math.random() * Math.PI * 2
                        };
                    }
                    
                    getRandomHeartColor() {
                        const colors = [
                            'rgba(255, 182, 193, 0.8)', // Light pink
                            'rgba(255, 105, 180, 0.7)', // Hot pink
                            'rgba(255, 192, 203, 0.8)', // Pink
                            'rgba(255, 140, 180, 0.7)', // Deep pink
                            'rgba(255, 20, 147, 0.6)',  // Deep pink
                            'rgba(219, 112, 147, 0.7)', // Pale violet red
                            'rgba(233, 150, 122, 0.6)', // Dark salmon
                            'rgba(255, 228, 225, 0.8)'  // Misty rose
                        ];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }
                    
                    drawHeart(ctx, x, y, size, color) {
                        ctx.save();
                        ctx.globalAlpha = color.split(',')[3].replace(')', '');
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        
                        // Draw a heart shape
                        ctx.moveTo(x, y);
                        ctx.bezierCurveTo(
                            x, y - size/3,
                            x - size/2, y - size/2,
                            x, y
                        );
                        ctx.bezierCurveTo(
                            x, y - size/3,
                            x + size/2, y - size/2,
                            x, y
                        );
                        
                        ctx.fill();
                        ctx.restore();
                    }
                    
                    updateHearts() {
                        // Add new hearts occasionally
                        if (Math.random() > 0.95) {
                            this.hearts.push(this.createHeart());
                        }
                        
                        // Update and remove hearts
                        for (let i = this.hearts.length - 1; i >= 0; i--) {
                            const heart = this.hearts[i];
                            
                            // Move up
                            heart.y -= heart.speed;
                            
                            // Add subtle sway
                            heart.x += Math.sin(Date.now() / 1000 + heart.swayOffset) * heart.sway;
                            
                            // Remove if off screen
                            if (heart.y < -heart.size * 2) {
                                this.hearts.splice(i, 1);
                            }
                        }
                    }
                    
                    render() {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        
                        // Draw each heart
                        for (const heart of this.hearts) {
                            this.drawHeart(
                                this.ctx, 
                                heart.x, 
                                heart.y, 
                                heart.size, 
                                heart.color
                            );
                        }
                    }
                    
                    animate() {
                        this.updateHearts();
                        this.render();
                        this.rafId = requestAnimationFrame(() => this.animate());
                    }
                    
                    startAnimation() {
                        if (!this.rafId) {
                            this.animate();
                        }
                    }
                    
                    stopAnimation() {
                        if (this.rafId) {
                            cancelAnimationFrame(this.rafId);
                            this.rafId = null;
                        }
                    }
                }

// Message Rendering Module
class MessageRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.messages = [];
    }
    
    async loadMessages() {
        try {
            const response = await fetch('data/messages.json');
            if (!response.ok) {
                throw new Error('Failed to load messages.json');
            }
            this.messages = await response.json();
            this.renderMessages();
        } catch (error) {
            console.error('Error loading messages:', error);
            // Fallback messages if JSON fails
            this.messages = [
                { text: "Thank you for being you." },
                { text: "You are deeply appreciated." },
                { text: "Wishing you love and joy." },
                { text: "Your presence matters." },
                { text: "May your days be bright." }
            ];
            this.renderMessages();
        }
    }
    
    
    renderMessages() {
    console.log("renderMessages called");
    console.log("Messages loaded:", this.messages);

    this.container.innerHTML = '';

    this.messages.forEach((msg, index) => {
        const messageEl = document.createElement('div');
        messageEl.style.animationDelay = `${index * 0.15}s`;
        messageEl.className = 'message';
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = msg.text;

        messageEl.appendChild(textDiv);
        this.container.appendChild(messageEl);
    });
}
}

// Initialize immediately (IMPORTANT)
const heartBackground = new HeartBackground();
const messageRenderer = new MessageRenderer('messagesContainer');
messageRenderer.loadMessages();

// Buttons
document.getElementById('replayBtn').addEventListener('click', () => {
    localStorage.removeItem('birthday_project_played');
    location.reload();
});

document.getElementById('exitBtn').addEventListener('click', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    heartBackground.stopAnimation();
});

}

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}

window.addEventListener('load', () => {
    console.log("Birthday project loaded successfully!");
});