*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:linear-gradient(135deg,#0f172a,#12479b);
    color:#fff;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
    overflow-x:hidden;
}

h1{
    margin:15px 0;
    text-align:center;
}

h3,h4{
    margin:6px 0;
    font-weight:normal;
}

.screen{
    width:100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:20px;
    padding:20px;
}

.logo{
    width:500px;
    max-width:90%;
    height:auto;
}

.game-title-img{
    width:225px;
    max-width:90%;
    display:block;
    margin:10px auto 15px;
}

.board{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:30px;
    flex-wrap:wrap;
    text-align:center;
    margin-bottom:10px;
}

button{
    padding:12px 28px;
    border:none;
    border-radius:12px;
    cursor:pointer;
    font-size:17px;
    font-weight:bold;
    background:rgba(0,0,0,.25);
    color:#fff;
    border:2px solid #3f8cff;
    transition:.25s;
    white-space:nowrap;
}

button:hover{
    transform:translateY(-2px);
    background:#1d4ed8;
}

button:disabled{
    opacity:.5;
    cursor:not-allowed;
}

.settingBox{
    background:#ffffff10;
    backdrop-filter:blur(8px);
    border-radius:16px;
    padding:25px;
    width:300px;
    max-width:95%;
}

.settingItem{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:15px 0;
    font-size:18px;
}

.container{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:flex-start;
    gap:20px;
    width:100%;
    max-width:900px;
    margin:30px auto;
}

.glass{
    width:72px;
    height:220px;
    position:relative;
    display:flex;
    flex-direction:column-reverse;
    overflow:hidden;
    cursor:pointer;

    border:4px solid rgba(255,255,255,.9);
    border-top:none;

    border-radius:0 0 18px 18px;

    background:
        linear-gradient(
            to right,
            rgba(255,255,255,.18) 0%,
            rgba(255,255,255,.05) 20%,
            rgba(255,255,255,.02) 50%,
            rgba(255,255,255,.08) 80%,
            rgba(255,255,255,.18) 100%
        );

    backdrop-filter:blur(3px);

    box-shadow:
        inset 3px 0 6px rgba(255,255,255,.35),
        inset -3px 0 6px rgba(255,255,255,.15),
        inset 0 -6px 10px rgba(255,255,255,.15),
        0 8px 18px rgba(0,0,0,.35);

    transition:.35s;
}

.glass:hover{
    transform:translateY(-6px);
}
.glass::before{
    content:"";
    position:absolute;
    left:6px;
    top:12px;
    width:8px;
    height:78%;
    border-radius:10px;
    background:rgba(255,255,255,.35);
    filter:blur(.5px);
}

.glass::after{
    content:"";
    position:absolute;
    right:8px;
    top:18px;
    width:4px;
    height:55%;
    border-radius:10px;
    background:rgba(255,255,255,.18);
}

.glass.selected{
    border-color:#00e5ff;
    box-shadow:
        0 0 15px #00e5ff,
        0 0 35px rgba(0,229,255,.35);
}

.layer{
    width:100%;
    height:25%;
    transition:.3s;
}

.layer::before{
    content:"";
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:6px;
    background:rgba(255,255,255,.35);
}

.buttons{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:15px;
    margin-top:20px;
    width:100%;
}

/* ==========================================
   POPUP
========================================== */

.popup{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1000;
    padding:20px;
}

.popupContent{
    background:#1e293b;
    padding:35px;
    border-radius:18px;
    text-align:center;
    width:100%;
    max-width:420px;
    box-sizing:border-box;
    animation:popup .3s ease;
}

.popupContent h2{
    margin-bottom:10px;
}

.popupContent p{
    margin-bottom:20px;
}


/* ==========================================
   BACK BUTTON
========================================== */

#backBtn{

    padding:10px 18px;

    border:2px solid #3f8cff;

    background:rgba(0,0,0,.25);

    color:#fff;

    border-radius:12px;

    font-size:17px;

    font-weight:bold;

    cursor:pointer;

    transition:.25s;

}

#backBtn:hover{

    background:#3f8cff;

    transform:translateY(-2px);

}


/* ==========================================
   TOGGLE
========================================== */

.toggleCircle input{

    display:none;

}

.circle{

    width:24px;

    height:24px;

    border-radius:50%;

    border:2px solid #5b5b5b;

    background:transparent;

    display:block;

    cursor:pointer;

    transition:.3s;

}

.toggleCircle input:checked + .circle{

    background:#00ff66;

    border-color:#00ff66;

    box-shadow:
        0 0 8px #00ff66,
        0 0 18px #00ff66,
        0 0 35px rgba(0,255,102,.6);

}

.toggleCircle input:not(:checked)+.circle{

    background:transparent;

    border-color:#777;

    box-shadow:none;

}

.toggleCircle:hover .circle{

    transform:scale(1.1);

}
/* ===========================
   GLASS ANIMATIONS
=========================== */

.glass.lift{
    transform:translateY(-40px);
    transition:transform .25s ease;
}

.glass.pouring{
    transition:transform .35s ease;
}

.glass.receiving{
    border-color:#00e5ff;
    box-shadow:
        0 0 12px #00e5ff,
        0 0 30px rgba(0,229,255,.7),
        inset 0 0 18px rgba(0,229,255,.4);
    animation:receiveGlow .5s ease;
}

.glass.completed{
    border-color:#ffd700;
    box-shadow:
        0 0 15px gold,
        0 0 35px gold,
        0 0 60px rgba(255,215,0,.7);
    animation:completeGlow 1s infinite alternate;
}

.glass.bounce{
    animation:bounceGlass .35s;
}

@keyframes receiveGlow{
    from{
        transform:scale(1);
    }
    50%{
        transform:scale(1.05);
    }
    to{
        transform:scale(1);
    }
}

@keyframes completeGlow{
    from{
        filter:brightness(1);
    }
    to{
        filter:brightness(1.35);
    }
}

@keyframes bounceGlass{
    0%{transform:scale(1);}
    40%{transform:scale(1.08);}
    100%{transform:scale(1);}
}

/* ===========================
   WATER STREAM
=========================== */

.stream{
    position:fixed;
    width:8px;
    border-radius:20px;
    transform-origin:top center;
    animation:streamAnim .45s linear forwards;
    pointer-events:none;
    z-index:9999;
}

@keyframes streamAnim{
    from{
        opacity:1;
        transform:scaleY(0);
    }
    to{
        opacity:0;
        transform:scaleY(1);
    }
}

/* ===========================
   RIPPLE
=========================== */

.ripple{
    position:absolute;
    left:50%;
    bottom:5px;
    width:18px;
    height:18px;
    margin-left:-9px;
    border:2px solid rgba(255,255,255,.9);
    border-radius:50%;
    animation:rippleAnim .45s forwards;
}

@keyframes rippleAnim{
    from{
        transform:scale(.3);
        opacity:1;
    }
    to{
        transform:scale(3);
        opacity:0;
    }
}

/* ===========================
   BUBBLES
=========================== */

.bubble{
    position:absolute;
    width:8px;
    height:8px;
    background:#fff;
    border-radius:50%;
    opacity:.8;
    animation:bubbleAnim .8s linear forwards;
}

@keyframes bubbleAnim{
    from{
        transform:translateY(0);
        opacity:1;
    }
    to{
        transform:translateY(-60px);
        opacity:0;
    }
}
.hintGlass{
    box-shadow:0 0 20px gold !important;
    animation:hintPulse .8s infinite alternate;
}

@keyframes hintPulse{
    from{
        transform:translateY(0);
    }
    to{
        transform:translateY(-8px);
    }
}

@keyframes hintGlow{

    from{

        box-shadow:0 0 10px yellow;

    }

    to{

        box-shadow:0 0 30px gold;

        transform:translateY(-8px);

    }

}

/* ===========================
   MENU
=========================== */

.menuButtons{

    width:100%;
    max-width:420px;

    display:flex;

    flex-direction:column;

    gap:14px;

}


.menuButtons button{

    width:100%;

    font-size:18px;

    padding:14px;

    border-radius:15px;

    transition:.25s;

}


.menuButtons button:hover{

    transform:translateY(-3px) scale(1.03);

    box-shadow:0 0 18px #3f8cff;

}
