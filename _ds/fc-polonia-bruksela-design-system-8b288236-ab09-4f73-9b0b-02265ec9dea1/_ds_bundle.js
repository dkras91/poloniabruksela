/* @ds-bundle: {"format":4,"namespace":"FCPoloniaBrukselaDesignSystem_8b2882","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Slider","sourcePath":"components/core/Slider.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"482509f70a68","components/core/Button.jsx":"10046984e63e","components/core/Input.jsx":"6cf35deaa86d","components/core/Select.jsx":"b29d3c4d87e3","components/core/Slider.jsx":"c2613f02d88c","components/core/Toggle.jsx":"243768ef2b3e","ui_kits/graphic-generator/GraphicGenerator.jsx":"4aa486f891e9","ui_kits/graphic-generator/drawEngine.js":"c99a1f902a66","ui_kits/graphic-generator/templates.js":"1433d7c71673"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FCPoloniaBrukselaDesignSystem_8b2882 = window.FCPoloniaBrukselaDesignSystem_8b2882 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'red'
}) {
  const tones = {
    red: {
      background: 'var(--color-red)',
      color: 'var(--color-cream)'
    },
    gold: {
      background: 'var(--color-gold)',
      color: 'var(--color-graphite)'
    },
    dark: {
      background: 'var(--color-graphite)',
      color: 'var(--color-cream)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-cream)',
      border: '1.5px solid var(--border-on-dark)'
    }
  };
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 13,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  onClick,
  type = 'button'
}) {
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 24px';
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 15;
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize,
    letterSpacing: '.02em',
    padding: pad,
    borderRadius: 'var(--radius-pill)',
    border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? .5 : 1,
    textTransform: 'uppercase',
    transition: 'transform .12s ease, background .12s ease'
  };
  const variants = {
    primary: {
      background: 'var(--color-red)',
      color: 'var(--color-cream)'
    },
    gold: {
      background: 'var(--color-gold)',
      color: 'var(--color-graphite)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-cream)',
      borderColor: 'var(--border-on-dark)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-graphite)',
      border: 'none'
    }
  };
  return React.createElement('button', {
    type,
    disabled,
    onClick,
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(.96)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  type = 'text'
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-muted-on-dark)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, label), React.createElement('input', {
    type,
    value,
    placeholder,
    maxLength,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      background: 'rgba(246,243,236,.06)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      color: 'var(--color-cream)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      outline: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  label,
  value,
  onChange,
  options
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-muted-on-dark)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, label), React.createElement('select', {
    value,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      background: 'rgba(246,243,236,.06)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      color: 'var(--color-cream)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      outline: 'none'
    }
  }, options.map(o => React.createElement('option', {
    key: o.value,
    value: o.value,
    style: {
      color: '#000'
    }
  }, o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Slider.jsx
try { (() => {
function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = ''
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('span', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-muted-on-dark)',
      textTransform: 'uppercase',
      letterSpacing: '.06em'
    }
  }, React.createElement('span', null, label), React.createElement('span', {
    style: {
      color: 'var(--color-gold)'
    }
  }, `${value}${unit}`)), React.createElement('input', {
    type: 'range',
    min,
    max,
    step,
    value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      width: '100%',
      accentColor: 'var(--color-red)'
    }
  }));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Slider.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function Toggle({
  options,
  value,
  onChange
}) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      background: 'rgba(246,243,236,.06)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-pill)',
      padding: 4,
      gap: 4
    }
  }, options.map(o => React.createElement('button', {
    key: o.value,
    type: 'button',
    onClick: () => onChange && onChange(o.value),
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      padding: '8px 18px',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      background: value === o.value ? 'var(--color-red)' : 'transparent',
      color: value === o.value ? 'var(--color-cream)' : 'var(--text-muted-on-dark)'
    }
  }, o.label)));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/graphic-generator/GraphicGenerator.jsx
try { (() => {
const {
  TEMPLATES,
  FORMATS,
  defaultState
} = window.PoloniaTemplates;
const {
  draw,
  exportPng,
  exportJpg
} = window.PoloniaDraw;
const {
  useState,
  useRef,
  useEffect,
  useCallback
} = React;
function loadImg(src) {
  return new Promise(resolve => {
    if (!src) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.error('Nie udało się wczytać obrazu: ' + src);
      resolve(null);
    };
    img.src = src;
  });
}
function fileToDataUrl(file) {
  return new Promise(resolve => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(file);
  });
}
function GraphicGenerator() {
  const {
    Button,
    Input,
    Select,
    Slider,
    Toggle,
    Badge
  } = window.FCPoloniaBrukselaDesignSystem_8b2882;
  const [state, setState] = useState(defaultState());
  const [photoImg, setPhotoImg] = useState(null);
  const [rivalImg, setRivalImg] = useState(null);
  const [crestImg, setCrestImg] = useState(null);
  const [crestTransferImg, setCrestTransferImg] = useState(null);
  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  useEffect(() => {
    const el = document.getElementById('crest-asset');
    const src = el && el.getAttribute('src') || '../../assets/crest.png';
    loadImg(src).then(setCrestImg);
    const el2 = document.getElementById('crest-transfer-asset');
    const src2 = el2 && el2.getAttribute('src') || '../../assets/crest-transfer.png';
    loadImg(src2).then(setCrestTransferImg);
  }, []);
  const patch = p => setState(s => ({
    ...s,
    ...p
  }));
  const patchTexts = p => setState(s => ({
    ...s,
    texts: {
      ...s.texts,
      ...p
    }
  }));
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const {
      w,
      h
    } = FORMATS[state.format];
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    draw(ctx, {
      ...state,
      photoImg,
      rivalImg,
      crestImg,
      crestTransferImg
    });
  }, [state, photoImg, rivalImg, crestImg, crestTransferImg]);
  const onPhoto = async e => {
    const f = e.target.files[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    setPhotoImg(await loadImg(url));
    patch({
      panX: 0,
      panY: 0,
      scale: 1.15,
      rotate: 0
    });
  };
  const onRival = async e => {
    const f = e.target.files[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    setRivalImg(await loadImg(url));
  };
  const onPointerDown = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width,
      my = (e.clientY - rect.top) / rect.height;
    const fx = state.facePoint.x,
      fy = state.facePoint.y;
    const near = Math.hypot(mx - fx, my - fy) < 0.06;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      mode: near ? 'face' : 'pan',
      panX: state.panX,
      panY: state.panY
    };
  };
  const onPointerMove = e => {
    if (!dragRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    if (dragRef.current.mode === 'face') {
      const mx = (e.clientX - rect.left) / rect.width,
        my = (e.clientY - rect.top) / rect.height;
      patch({
        facePoint: {
          x: Math.min(1, Math.max(0, mx)),
          y: Math.min(1, Math.max(0, my))
        }
      });
    } else {
      const scaleRatio = canvasRef.current.width / rect.width;
      const dx = (e.clientX - dragRef.current.x) * scaleRatio,
        dy = (e.clientY - dragRef.current.y) * scaleRatio;
      patch({
        panX: dragRef.current.panX + dx,
        panY: dragRef.current.panY + dy
      });
    }
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };
  const doExport = () => {
    const {
      w,
      h
    } = FORMATS[state.format];
    exportPng({
      ...state,
      photoImg,
      rivalImg,
      crestImg,
      crestTransferImg
    }, `polonia_${state.templateType}_${w}x${h}.png`);
  };
  const doExportJpg = () => {
    const {
      w,
      h
    } = FORMATS[state.format];
    exportJpg({
      ...state,
      photoImg,
      rivalImg,
      crestImg,
      crestTransferImg
    }, `polonia_${state.templateType}_${w}x${h}_fb.jpg`, 0.92);
  };
  const t = state.texts;
  const previewMaxH = 560;
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 32,
      fontFamily: 'var(--font-body)',
      color: 'var(--color-cream)',
      background: 'var(--color-graphite)',
      padding: 32,
      borderRadius: 12
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'center'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 22,
      letterSpacing: '.03em'
    }
  }, 'PODGLĄD — TRYB PEŁNE ZDJĘCIE'), React.createElement('canvas', {
    ref: canvasRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: onPointerUp,
    style: {
      maxHeight: previewMaxH,
      width: state.format === 'story' ? previewMaxH * (1080 / 1920) : previewMaxH,
      height: previewMaxH,
      borderRadius: 10,
      cursor: 'grab',
      boxShadow: '0 10px 30px rgba(0,0,0,.5)',
      touchAction: 'none'
    }
  }), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--text-muted-on-dark)',
      maxWidth: previewMaxH,
      textAlign: 'center'
    }
  }, 'Przeciągnij zdjęcie, aby ustawić kadr. Przeciągnij czerwony okrąg, aby wskazać twarz zawodnika — linie i kropka widoczne tylko w edytorze.'), React.createElement(Toggle, {
    value: state.showGuides ? 'on' : 'off',
    onChange: v => patch({
      showGuides: v === 'on'
    }),
    options: [{
      value: 'on',
      label: 'Linie pomocnicze'
    }, {
      value: 'off',
      label: 'Bez linii'
    }]
  })), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      width: 340
    }
  }, React.createElement(Toggle, {
    value: state.format,
    onChange: v => patch({
      format: v
    }),
    options: [{
      value: 'square',
      label: '1:1 Post'
    }, {
      value: 'story',
      label: '9:16 Relacja'
    }]
  }), React.createElement(Select, {
    label: 'Szablon',
    value: state.templateType,
    onChange: v => patch({
      templateType: v
    }),
    options: TEMPLATES.map(x => ({
      value: x.id,
      label: x.label
    }))
  }), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-muted-on-dark)',
      textTransform: 'uppercase'
    }
  }, 'Zdjęcie (z telefonu, bez wycinania)'), React.createElement('input', {
    type: 'file',
    accept: 'image/*',
    onChange: onPhoto,
    style: {
      color: 'var(--color-cream)',
      fontSize: 13
    }
  })), React.createElement(Slider, {
    label: 'Skala',
    value: state.scale,
    onChange: v => patch({
      scale: v
    }),
    min: 1,
    max: 2.5,
    step: 0.01,
    unit: '×'
  }), React.createElement(Slider, {
    label: 'Obrót',
    value: state.rotate,
    onChange: v => patch({
      rotate: v
    }),
    min: -5,
    max: 5,
    step: 0.5,
    unit: '°'
  }), React.createElement(Button, {
    variant: 'outline',
    size: 'sm',
    onClick: () => patch({
      flipH: !state.flipH
    })
  }, state.flipH ? 'Odbicie: WŁ' : 'Odbicie poziome'), React.createElement(Slider, {
    label: 'Jasność',
    value: state.brightness,
    onChange: v => patch({
      brightness: v
    }),
    min: -50,
    max: 50,
    unit: '%'
  }), React.createElement(Slider, {
    label: 'Siła gradientu',
    value: state.gradientStrength,
    onChange: v => patch({
      gradientStrength: v
    }),
    min: 0,
    max: 100,
    unit: '%'
  }), React.createElement('div', {
    style: {
      height: 1,
      background: 'var(--border-on-dark)'
    }
  }), state.templateType === 'matchday' || state.templateType === 'preview' || state.templateType === 'result' ? React.createElement(Toggle, {
    value: state.venue,
    onChange: v => patch({
      venue: v
    }),
    options: [{
      value: 'home',
      label: 'Gospodarz'
    }, {
      value: 'away',
      label: 'Wyjazd'
    }]
  }) : null, state.templateType === 'matchday' || state.templateType === 'preview' || state.templateType === 'tournament' ? React.createElement(React.Fragment, null, state.templateType === 'tournament' ? React.createElement(Input, {
    label: 'Nazwa turnieju',
    value: t.tournamentName,
    onChange: v => patchTexts({
      tournamentName: v
    })
  }) : React.createElement(Input, {
    label: 'Rywal',
    value: t.rival,
    onChange: v => patchTexts({
      rival: v
    })
  }), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement(Input, {
    label: 'Data',
    value: t.date,
    onChange: v => patchTexts({
      date: v
    })
  }), React.createElement(Input, {
    label: 'Godzina',
    value: t.time,
    onChange: v => patchTexts({
      time: v
    })
  })), state.templateType === 'matchday' ? React.createElement(Input, {
    label: 'Dzień tygodnia',
    value: t.day,
    onChange: v => patchTexts({
      day: v
    })
  }) : null, React.createElement(Input, {
    label: state.templateType === 'tournament' ? 'Miejsce turnieju' : 'Stadion',
    value: t.stadion,
    onChange: v => patchTexts({
      stadion: v
    })
  }), React.createElement(Button, {
    variant: 'outline',
    size: 'sm',
    onClick: () => patchTexts({
      stadion: 'CHEM. DU STRUYKBEKEN 2, 1200 BRUKSELA'
    })
  }, 'Stadion Polonii')) : null, state.templateType === 'goal' ? React.createElement(React.Fragment, null, React.createElement(Input, {
    label: 'Strzelec',
    value: t.scorer,
    onChange: v => patchTexts({
      scorer: v
    })
  }), React.createElement(Input, {
    label: 'Minuta',
    value: t.minute,
    onChange: v => patchTexts({
      minute: v
    })
  })) : null, state.templateType === 'result' ? React.createElement(React.Fragment, null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement(Input, {
    label: 'Gole Polonia',
    value: t.scoreHome,
    onChange: v => patchTexts({
      scoreHome: v
    })
  }), React.createElement(Input, {
    label: 'Gole rywala',
    value: t.scoreAway,
    onChange: v => patchTexts({
      scoreAway: v
    })
  })), React.createElement(Input, {
    label: 'Rywal',
    value: t.rival,
    onChange: v => patchTexts({
      rival: v
    })
  }), React.createElement(Select, {
    label: 'Status',
    value: t.status,
    onChange: v => patchTexts({
      status: v
    }),
    options: [{
      value: 'win',
      label: 'Wygrana'
    }, {
      value: 'draw',
      label: 'Remis'
    }, {
      value: 'loss',
      label: 'Porażka'
    }]
  })) : null, state.templateType === 'news' ? React.createElement(React.Fragment, null, React.createElement(Input, {
    label: 'Nagłówek',
    value: t.newsHeadline,
    onChange: v => patchTexts({
      newsHeadline: v
    })
  }), React.createElement(Input, {
    label: 'Nazwisko / podmiot',
    value: t.playerName,
    onChange: v => patchTexts({
      playerName: v
    })
  }), React.createElement(Input, {
    label: 'Podtytuł',
    value: t.playerPos,
    onChange: v => patchTexts({
      playerPos: v
    })
  })) : null, state.templateType === 'transfer' ? React.createElement(React.Fragment, null, React.createElement(Input, {
    label: 'Nazwisko zawodnika',
    value: t.playerName,
    onChange: v => patchTexts({
      playerName: v
    })
  }), React.createElement(Input, {
    label: 'Pozycja',
    value: t.playerPos,
    onChange: v => patchTexts({
      playerPos: v
    })
  })) : null, React.createElement(Input, {
    label: 'CTA (opcjonalnie, tylko jeśli mieści się dużą czcionką)',
    value: t.cta,
    onChange: v => patchTexts({
      cta: v
    })
  }), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--text-muted-on-dark)',
      textTransform: 'uppercase'
    }
  }, state.templateType === 'transfer' ? 'Herb klubu, z którego odchodzi (opcjonalnie)' : state.templateType === 'tournament' ? 'Logo turnieju (opcjonalnie)' : 'Herb rywala (opcjonalnie)'), React.createElement('input', {
    type: 'file',
    accept: 'image/*',
    onChange: onRival,
    style: {
      color: 'var(--color-cream)',
      fontSize: 13
    }
  })), React.createElement(Button, {
    variant: 'primary',
    onClick: doExportJpg
  }, `Eksportuj JPG dla Facebooka ${FORMATS[state.format].w}×${FORMATS[state.format].h}`), React.createElement(Button, {
    variant: 'outline',
    onClick: doExport
  }, `Eksportuj PNG ${FORMATS[state.format].w}×${FORMATS[state.format].h}`)));
}
window.GraphicGenerator = GraphicGenerator;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/graphic-generator/GraphicGenerator.jsx", error: String((e && e.message) || e) }); }

// ui_kits/graphic-generator/drawEngine.js
try { (() => {
(() => {
  const {
    FORMATS,
    STATUS_LABEL
  } = window.PoloniaTemplates;
  const RED = '#E2092F',
    GOLD = '#B7A85C',
    GRAPHITE = '#121216',
    CREAM = '#F6F3EC';
  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
  function fitText(ctx, text, maxWidth, weight, startSize, family, minSize) {
    let size = startSize;
    ctx.font = `${weight} ${size}px ${family}`;
    while (ctx.measureText(text).width > maxWidth && size > (minSize || 18)) {
      size -= 1;
      ctx.font = `${weight} ${size}px ${family}`;
    }
    return size;
  }
  function wrapUpper(ctx, text, maxWidth) {
    const words = (text || '').toUpperCase().split(' ').filter(Boolean);
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && cur) {
        lines.push(cur);
        cur = w;
      } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function drawPhoto(ctx, cw, ch, photoImg, panX, panY, scale, rotate, flipH, brightness) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, cw, ch);
    ctx.clip();
    if (photoImg) {
      ctx.filter = `brightness(${100 + brightness}%)`;
      const iw = photoImg.naturalWidth,
        ih = photoImg.naturalHeight;
      const base = Math.max(cw / iw, ch / ih);
      const s = base * scale;
      ctx.translate(cw / 2 + panX, ch / 2 + panY);
      ctx.rotate(rotate * Math.PI / 180);
      ctx.scale(flipH ? -s : s, s);
      ctx.drawImage(photoImg, -iw / 2, -ih / 2, iw, ih);
    } else {
      ctx.fillStyle = '#2a2a30';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = 'rgba(246,243,236,.35)';
      ctx.font = '700 28px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DODAJ ZDJĘCIE', cw / 2, ch / 2);
    }
    ctx.restore();
  }
  function drawClubHeader(ctx, cw, margin, format, crestImg, plain) {
    const h = format === 'story' ? 122 : 104;
    const s1 = format === 'story' ? 35 : 30;
    const s2 = format === 'story' ? 52 : 44;
    const padL = format === 'story' ? 18 : 15;
    const gap = format === 'story' ? 22 : 18;
    const padR = format === 'story' ? 34 : 28;
    const line1 = 'FC POLONIA',
      line2 = 'BRUKSELA';
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const f1 = `800 ${s1}px Inter, sans-serif`;
    const f2 = `900 ${s2}px 'Barlow Condensed', sans-serif`;
    ctx.font = f1;
    const w1 = ctx.measureText(line1).width;
    ctx.font = f2;
    const w2 = ctx.measureText(line2).width;
    const textW = Math.max(w1, w2);
    const crestH = h - (format === 'story' ? 34 : 28);
    const ar = crestImg ? crestImg.naturalWidth / crestImg.naturalHeight : 1.07;
    const crestW = crestH * ar;
    const side = format === 'story' ? 24 : 20;
    const pillW = side + crestW + side + textW + padR;
    if (!plain) {
      ctx.fillStyle = 'rgba(18,18,22,.86)';
      roundRect(ctx, margin, margin, pillW, h, format === 'story' ? 22 : 18);
      ctx.fill();
    }
    drawCrest(ctx, crestImg, margin + side, margin + (h - crestH) / 2, crestW, crestH);
    const tx = margin + side + crestW + side;
    if (plain === 'light') {
      ctx.shadowColor = 'rgba(10,10,13,.55)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 2;
    }
    ctx.fillStyle = plain && plain !== 'light' ? GRAPHITE : CREAM;
    // both lines stretched to identical width
    ctx.font = f1;
    ctx.save();
    ctx.translate(tx, margin + h * 0.42);
    ctx.scale(textW / w1, 1);
    ctx.fillText(line1, 0, 0);
    ctx.restore();
    ctx.font = f2;
    ctx.save();
    ctx.translate(tx, margin + h * 0.79);
    ctx.scale(textW / w2, 1);
    ctx.fillText(line2, 0, 0);
    ctx.restore();
    ctx.restore();
    return h;
  }
  function margin0(format) {
    return format === 'story' ? 48 : 40;
  }

  /** Canvas downscales badly in one step (>2x loses detail). Halve progressively, then cache. */
  const _crestCache = new Map();
  function scaledImage(img, dw, dh) {
    const w = Math.max(1, Math.round(dw)),
      h = Math.max(1, Math.round(dh));
    const key = (img.currentSrc || img.src || 'img') + '|' + w + 'x' + h;
    const hit = _crestCache.get(key);
    if (hit) return hit;
    let sw = img.naturalWidth,
      sh = img.naturalHeight,
      cur = img;
    while (sw > w * 2 && sh > h * 2) {
      sw = Math.max(w, Math.round(sw / 2));
      sh = Math.max(h, Math.round(sh / 2));
      const tmp = document.createElement('canvas');
      tmp.width = sw;
      tmp.height = sh;
      const tc = tmp.getContext('2d');
      tc.imageSmoothingEnabled = true;
      tc.imageSmoothingQuality = 'high';
      tc.drawImage(cur, 0, 0, sw, sh);
      cur = tmp;
    }
    const out = document.createElement('canvas');
    out.width = w;
    out.height = h;
    const oc = out.getContext('2d');
    oc.imageSmoothingEnabled = true;
    oc.imageSmoothingQuality = 'high';
    oc.drawImage(cur, 0, 0, w, h);
    _crestCache.set(key, out);
    return out;
  }
  function drawCrest(ctx, img, x, y, w, h) {
    if (!img) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(scaledImage(img, w, h), x, y, w, h);
  }
  function drawTag(ctx, text, x, y, format, tone) {
    ctx.font = `800 ${format === 'story' ? 40 : 30}px Inter, sans-serif`;
    const tw = ctx.measureText(text).width;
    const padX = 24,
      h = format === 'story' ? 72 : 56;
    ctx.fillStyle = tone === 'gold' ? GOLD : RED;
    roundRect(ctx, x, y, tw + padX * 2, h, h / 2);
    ctx.fill();
    ctx.fillStyle = tone === 'gold' ? GRAPHITE : CREAM;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const ref = ctx.measureText('HXM');
    const asc = ref.actualBoundingBoxAscent || (format === 'story' ? 29 : 22);
    ctx.fillText(text, x + padX, y + h / 2 + asc / 2);
    return h;
  }
  function drawRivalCircle(ctx, cx, cy, r, rivalImg, rivalLabel, forExport, onLight) {
    if (rivalImg) {
      const iw = rivalImg.naturalWidth,
        ih = rivalImg.naturalHeight;
      const s = Math.min(r * 2 / iw, r * 2 / ih);
      const dw = iw * s,
        dh = ih * s;
      drawCrest(ctx, rivalImg, cx - dw / 2, cy - dh / 2, dw, dh);
      return;
    }
    if (forExport) return;
    ctx.save();
    ctx.strokeStyle = onLight ? 'rgba(18,18,22,.35)' : 'rgba(246,243,236,.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = onLight ? 'rgba(18,18,22,.6)' : 'rgba(246,243,236,.6)';
    ctx.textAlign = 'center';
    ctx.font = `800 ${Math.max(30, Math.round(r * 0.42))}px Inter, sans-serif`;
    ctx.fillText('HERB', cx, cy + r * 0.15);
    ctx.restore();
  }
  function drawGradient(ctx, cw, ch, y0, y1, alpha, from, to) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, from);
    g.addColorStop(1, to);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.fillRect(0, y0, cw, y1 - y0);
    ctx.restore();
  }
  function drawMatchday(ctx, cw, ch, format, texts, gAlpha, venue) {
    const margin = format === 'story' ? 48 : 40;
    drawGradient(ctx, cw, ch, 0, ch * 0.42, gAlpha, 'rgba(18,18,22,.75)', 'rgba(18,18,22,0)');
    drawGradient(ctx, cw, ch, ch * 0.42, ch, gAlpha, 'rgba(18,18,22,0)', 'rgba(18,18,22,.4)');
    let y = margin + (format === 'story' ? 190 : 170);
    const tagH = drawTag(ctx, venue === 'away' ? 'GRAMY NA WYJEŹDZIE' : 'POLONIA RAZEM!', margin, y, format, venue === 'away' ? 'gold' : null);
    y += tagH + (format === 'story' ? 36 : 30);
    const headSize = format === 'story' ? 96 : 78;
    ctx.font = `900 ${headSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillStyle = CREAM;
    const lines = wrapUpper(ctx, 'DZIEŃ MECZOWY', cw - margin * 2);
    ctx.save();
    if (format !== 'story') {
      ctx.shadowColor = 'rgba(18,18,22,.45)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 4;
    }
    for (const l of lines) {
      ctx.fillText(l, margin, y + headSize * 0.82);
      y += headSize * 0.98;
    }
    ctx.restore();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 5;
    const ruleW = format === 'story' ? 260 : 220;
    ctx.beginPath();
    ctx.moveTo(margin, y + 14);
    ctx.lineTo(margin + ruleW, y + 14);
    ctx.stroke();
    const panelH = format === 'story' ? 248 : 214;
    const panelY = ch - panelH - (format === 'story' ? 220 : 0);
    const away = venue === 'away';
    ctx.fillStyle = away ? GOLD : RED;
    ctx.fillRect(0, panelY, cw, panelH);
    const onGold = away ? GRAPHITE : CREAM;
    const dateSize = format === 'story' ? 74 : 64,
      subSize = format === 'story' ? 42 : 37,
      lineSize = format === 'story' ? 52 : 45;
    const padX = format === 'story' ? 56 : 48;
    const colX = cw * (format === 'story' ? 0.42 : 0.36);
    ctx.textAlign = 'left';
    ctx.fillStyle = onGold;
    ctx.font = `900 ${dateSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillText(texts.date, padX, panelY + panelH * 0.46);
    ctx.font = `800 ${subSize}px Inter, sans-serif`;
    ctx.fillStyle = away ? CREAM : GOLD;
    ctx.fillText(`${texts.day} · ${texts.time}`, padX, panelY + panelH * 0.74);
    ctx.font = `900 ${lineSize}px 'Barlow Condensed', sans-serif`;
    const mdA = (away ? texts.rival : 'POLONIA').toUpperCase();
    const mdB = (away ? 'POLONIA' : texts.rival).toUpperCase();
    const wA = ctx.measureText(mdA + ' ').width,
      wVS = ctx.measureText('VS ').width,
      wB = ctx.measureText(mdB).width;
    const mvy = panelY + panelH * (format === 'story' ? 0.60 : 0.42);
    let mvx = format === 'story' ? colX + (cw - padX - colX - (wA + wVS + wB)) / 2 : colX;
    ctx.fillStyle = onGold;
    ctx.fillText(mdA + ' ', mvx, mvy);
    mvx += wA;
    ctx.fillStyle = away ? CREAM : GOLD;
    ctx.fillText('VS ', mvx, mvy);
    mvx += wVS;
    ctx.fillStyle = onGold;
    ctx.fillText(mdB, mvx, mvy);
    if (format !== 'story') {
      ctx.fillStyle = onGold;
      const addrLine = (texts.stadion || '').toUpperCase().split(',').map(s => s.trim()).filter(Boolean).join(' · ');
      const availW = cw - colX - padX;
      fitText(ctx, addrLine, availW, 700, 26, 'Inter, sans-serif', 20);
      ctx.fillText(addrLine, colX, panelY + panelH * 0.72);
    }
    return panelY;
  }
  function drawPreview(ctx, cw, ch, format, texts, photoImg, panX, panY, scale, rotate, flipH, brightness, rivalImg, venue, forExport, kind) {
    const isTour = kind === 'tournament';
    const margin = format === 'story' ? 48 : 40;
    const headSize = format === 'story' ? 104 : 60,
      subSize = format === 'story' ? 62 : 38,
      lineSize = format === 'story' ? 48 : 30;
    let y = (format === 'story' ? ch - 220 : ch - margin) - (subSize * 1.1 + 24 + lineSize * 1.3 + lineSize * 1.15);
    const splitY = format === 'story' ? ch * 0.66 : y - headSize * 1.5;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, cw, splitY);
    ctx.clip();
    drawPhoto(ctx, cw, ch, photoImg, panX, panY, scale, rotate, flipH, brightness);
    drawGradient(ctx, cw, splitY, splitY - 120, splitY, 1, 'rgba(18,18,22,0)', 'rgba(18,18,22,.35)');
    ctx.restore();
    const panelGrad = ctx.createLinearGradient(0, splitY, 0, ch);
    panelGrad.addColorStop(0, '#FFFEFA');
    panelGrad.addColorStop(1, '#D8D3C6');
    ctx.fillStyle = panelGrad;
    ctx.fillRect(0, splitY, cw, ch - splitY);
    const bodyH = ch - splitY;
    const lift = format === 'story' ? 70 : 0;
    const dateSize = format === 'story' ? 66 : lineSize;
    const addrSize = format === 'story' ? 40 : 30;
    ctx.textAlign = 'left';
    ctx.fillStyle = RED;
    ctx.font = `900 ${headSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillText(isTour ? 'ZAPOWIEDŹ TURNIEJU' : 'ZAPOWIEDŹ MECZU', margin, y - lift);
    y += subSize * 1.1;
    const crestR = format === 'story' ? 108 : 92;
    const textMax = cw - margin * 2 - crestR * 2 - (format === 'story' ? 40 : 28);
    const pvA = (venue === 'away' ? texts.rival : 'POLONIA BRUKSELA').toUpperCase();
    const pvB = (venue === 'away' ? 'POLONIA BRUKSELA' : texts.rival).toUpperCase();
    const tourName = (texts.tournamentName || '').toUpperCase();
    const nameSize = fitText(ctx, isTour ? tourName : `${pvA} VS ${pvB}`, textMax, 900, subSize, "'Barlow Condensed', sans-serif", subSize * 0.6) || subSize;
    ctx.font = `900 ${nameSize}px 'Barlow Condensed', sans-serif`;
    let pvx = margin;
    const nameY = y - lift;
    if (isTour) {
      ctx.fillStyle = GRAPHITE;
      ctx.fillText(tourName, pvx, nameY);
    } else {
      ctx.fillStyle = GRAPHITE;
      ctx.fillText(pvA + ' ', pvx, nameY);
      pvx += ctx.measureText(pvA + ' ').width;
      ctx.fillStyle = RED;
      ctx.fillText('VS ', pvx, nameY);
      pvx += ctx.measureText('VS ').width;
      ctx.fillStyle = GRAPHITE;
      ctx.fillText(pvB, pvx, nameY);
    }
    y += 24;
    const ruleY = format === 'story' ? nameY + 30 : y;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(margin, ruleY);
    ctx.lineTo(margin + (format === 'story' ? 260 : 220), ruleY);
    ctx.stroke();
    y += lineSize * 1.3;
    if (format === 'story') y = ruleY + dateSize * 1.15;
    ctx.font = `900 ${dateSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillStyle = GRAPHITE;
    ctx.fillText(`${texts.date} • ${texts.time}`, margin, y);
    y += format === 'story' ? addrSize * 1.35 : lineSize * 1.15;
    ctx.fillStyle = RED;
    if (format === 'story') {
      const parts = (venue === 'away' ? texts.stadion : `${texts.stadion}`).toUpperCase().split(',').map(s => s.trim()).filter(Boolean);
      const order = isTour || venue === 'away' ? parts : [parts[1] || 'BRUKSELA', parts[0] || ''].filter(Boolean);
      order.slice(0, 2).forEach((part, i) => {
        fitText(ctx, part, textMax, 800, addrSize, 'Inter, sans-serif', addrSize * 0.7);
        ctx.fillText(part, margin, y + i * addrSize * 1.15);
      });
    } else {
      fitText(ctx, (texts.stadion || '').toUpperCase(), textMax, 800, addrSize, 'Inter, sans-serif', addrSize * 0.7);
      ctx.fillText((texts.stadion || '').toUpperCase(), margin, y);
    }
    drawRivalCircle(ctx, cw - margin - crestR, splitY + bodyH * 0.5, crestR, rivalImg, texts.rival, forExport, true);
    return splitY;
  }
  function drawGoal(ctx, cw, ch, format, texts, gAlpha) {
    drawGradient(ctx, cw, ch, ch * 0.55, ch, gAlpha, 'rgba(18,18,22,0)', 'rgba(18,18,22,.75)');
    drawGradient(ctx, cw, ch, 0, ch * 0.22, gAlpha, 'rgba(18,18,22,.6)', 'rgba(18,18,22,0)');
    const margin = format === 'story' ? 48 : 40;
    const headSize = format === 'story' ? 150 : 135;
    const bandH = headSize * 1.44;
    const bandY = format === 'story' ? ch * 0.36 : ch * 0.30;
    const bandW = cw * 0.52;
    ctx.save();
    ctx.textBaseline = 'alphabetic';
    const panelH = format === 'story' ? 212 : 186;
    const panelY = ch - panelH - (format === 'story' ? 240 : 48);
    const goldH = 0;
    const bandTop = panelY - (format === 'story' ? 18 : 12) - bandH;
    ctx.fillStyle = RED;
    ctx.fillRect(0, bandTop, cw, bandH);
    ctx.fillStyle = CREAM;
    ctx.textAlign = 'center';
    ctx.font = `900 ${headSize}px 'Barlow Condensed', sans-serif`;
    const gm = ctx.measureText('GOOOL!');
    const gAsc = gm.actualBoundingBoxAscent || headSize * 0.72;
    const gDesc = gm.actualBoundingBoxDescent || 0;
    ctx.fillText('GOOOL!', cw / 2, bandTop + bandH / 2 + (gAsc - gDesc) / 2);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(18,18,22,.88)';
    roundRect(ctx, margin, panelY, cw - margin * 2, panelH, 24);
    ctx.fill();
    const minSize = format === 'story' ? 84 : 76;
    const nameSize = format === 'story' ? 72 : 64;
    const teamSize = format === 'story' ? 40 : 32;
    const padX = margin + (format === 'story' ? 42 : 36);
    const baseY = panelY + panelH * 0.50;
    ctx.fillStyle = RED;
    ctx.font = `900 ${minSize}px 'Barlow Condensed', sans-serif`;
    const minText = `${texts.minute}'`;
    ctx.fillText(minText, padX, baseY);
    const nameX = padX + ctx.measureText(minText).width + (format === 'story' ? 44 : 38);
    ctx.fillStyle = CREAM;
    ctx.font = `900 ${nameSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillText(texts.scorer.toUpperCase(), nameX, baseY);
    ctx.fillStyle = GOLD;
    ctx.font = `800 ${teamSize}px Inter, sans-serif`;
    ctx.fillText('FC POLONIA BRUKSELA', nameX, panelY + panelH * 0.76);
    ctx.restore();
    return bandTop;
  }
  function drawResult(ctx, cw, ch, format, texts, gAlpha, crestImg, rivalImg, venue, forExport) {
    drawGradient(ctx, cw, ch, 0, ch, gAlpha * 0.6, 'rgba(18,18,22,.15)', 'rgba(18,18,22,.55)');
    const margin = format === 'story' ? 48 : 40;
    const panelH = format === 'story' ? 460 : 380;
    const panelY = format === 'story' ? ch * 0.55 : ch * 0.44;
    ctx.fillStyle = 'rgba(18,18,22,.9)';
    roundRect(ctx, 0, panelY, cw, panelH, 20);
    ctx.fill();
    const labelSize = format === 'story' ? 40 : 30,
      scoreSize = format === 'story' ? 140 : 118,
      teamSize = format === 'story' ? 40 : 32;
    ctx.textAlign = 'center';
    ctx.fillStyle = GOLD;
    ctx.font = `800 ${labelSize}px Inter, sans-serif`;
    ctx.letterSpacing = '2px';
    ctx.fillText('KONIEC MECZU', cw / 2, panelY + panelH * 0.18);
    ctx.letterSpacing = '0px';
    ctx.fillStyle = CREAM;
    ctx.font = `900 ${scoreSize}px 'Barlow Condensed', sans-serif`;
    const a = venue === 'away' ? texts.scoreAway : texts.scoreHome;
    const b = venue === 'away' ? texts.scoreHome : texts.scoreAway;
    ctx.fillText(`${a}  :  ${b}`, cw / 2, panelY + panelH * 0.58);
    const scoreFont = ctx.font;
    ctx.font = `800 ${teamSize}px Inter, sans-serif`;
    const pair = venue === 'away' ? `${texts.rival} — POLONIA BRUKSELA` : `POLONIA BRUKSELA — ${texts.rival}`;
    ctx.fillText(pair.toUpperCase(), cw / 2, panelY + panelH * 0.82);
    const crestSize = format === 'story' ? 150 : 128;
    const crestR = format === 'story' ? 75 : 64;
    ctx.font = scoreFont;
    const scoreW = ctx.measureText(`${a}  :  ${b}`).width;
    const inset = format === 'story' ? 70 : 58;
    const leftCX = cw / 2 - scoreW / 2 - inset - crestR;
    const rightCX = cw / 2 + scoreW / 2 + inset + crestR;
    const midY = panelY + panelH * 0.50;
    const crestCX = venue === 'away' ? rightCX : leftCX;
    const rivalCX = venue === 'away' ? leftCX : rightCX;
    if (crestImg) {
      const cs = Math.min(crestSize / crestImg.naturalWidth, crestSize / crestImg.naturalHeight);
      const cdw = crestImg.naturalWidth * cs,
        cdh = crestImg.naturalHeight * cs;
      drawCrest(ctx, crestImg, crestCX - cdw / 2, midY - cdh / 2, cdw, cdh);
    }
    drawRivalCircle(ctx, rivalCX, midY, crestR, rivalImg, texts.rival, forExport);
    const bandH = format === 'story' ? 140 : 118;
    const bandY = panelY + panelH + (format === 'story' ? 50 : 36);
    ctx.fillStyle = RED;
    ctx.fillRect(0, bandY, cw, bandH);
    ctx.fillStyle = CREAM;
    ctx.font = `900 ${format === 'story' ? 60 : 50}px 'Barlow Condensed', sans-serif`;
    ctx.fillText(STATUS_LABEL[texts.status] || '', cw / 2, bandY + bandH * 0.66);
    return panelY;
  }
  function drawNews(ctx, cw, ch, format, texts, gAlpha, crestImg, rivalImg, forExport, isTransfer) {
    const isPostTransfer = isTransfer && format !== 'story';
    if (isPostTransfer) {
      const m0 = margin0(format);
      const hH = format === 'story' ? 122 : 104;
      const wx = m0 + 170,
        wy = m0 + hH / 2,
        wr = 300;
      const wg = ctx.createRadialGradient(wx, wy, 8, wx, wy, wr);
      wg.addColorStop(0, 'rgba(250,248,242,.82)');
      wg.addColorStop(0.45, 'rgba(250,248,242,.5)');
      wg.addColorStop(1, 'rgba(250,248,242,0)');
      ctx.fillStyle = wg;
      ctx.fillRect(0, 0, wx + wr, wy + wr);
    } else if (isTransfer) {
      drawGradient(ctx, cw, ch, 0, ch * 0.7, gAlpha, 'rgba(18,18,22,.7)', 'rgba(18,18,22,0)');
    }
    drawGradient(ctx, cw, ch, ch * 0.55, ch, gAlpha * 0.7, 'rgba(18,18,22,0)', 'rgba(18,18,22,.55)');
    const margin = format === 'story' ? 48 : 40;
    const headSize = format === 'story' ? 92 : 76;
    const nameSize = isPostTransfer ? 58 : format === 'story' ? 62 : 52;
    const posSize = format === 'story' ? 40 : 30;
    const ruleW = format === 'story' ? 260 : 220;
    const tagText = isTransfer ? 'TRANSFER' : 'AKTUALNOŚCI';
    const tagH = format === 'story' ? 72 : 56;
    ctx.textAlign = 'left';
    let y = margin + (format === 'story' ? 190 : 170);
    const tagY = y;
    y += tagH + (format === 'story' ? 18 : 14);
    ctx.font = `900 ${headSize}px 'Barlow Condensed', sans-serif`;
    const headText = isTransfer ? 'NOWY ZAWODNIK' : texts.newsHeadline || 'AKTUALNOŚCI';
    const lines = isTransfer && format === 'story' ? ['NOWY', 'ZAWODNIK'] : wrapUpper(ctx, headText, cw - margin * 2);
    const headBaselines = [];
    let headW = 0;
    for (const l of lines) {
      headW = Math.max(headW, ctx.measureText(l).width);
      headBaselines.push(y + headSize * 0.82);
      y += headSize * 0.98;
    }
    const ruleY = y + 16;
    y += format === 'story' ? 74 : 60;
    ctx.font = `900 ${nameSize}px 'Barlow Condensed', sans-serif`;
    const nameText = texts.playerName.toUpperCase();
    const nameW = ctx.measureText(nameText).width;
    const nameBaseline = y + nameSize * 0.8;
    y += nameSize * 1.0 + (format === 'story' ? 16 : 11);
    ctx.font = `800 ${posSize}px Inter, sans-serif`;
    const posText = texts.playerPos.toUpperCase();
    const posW = ctx.measureText(posText).width;
    const posBaseline = y + posSize * 0.8;
    if (isPostTransfer) {
      ctx.font = `800 ${tagH === 72 ? 40 : 30}px Inter, sans-serif`;
      const tagW = ctx.measureText(tagText).width + 48;
      const blockW = Math.max(tagW, headW, nameW, posW, ruleW);
      const pw = Math.min(cw, margin + blockW + 54);
      const py = tagY - 36,
        ph = posBaseline + 42 - py;
      const g = ctx.createLinearGradient(0, 0, pw, 0);
      g.addColorStop(0, 'rgba(10,10,13,.9)');
      g.addColorStop(0.7, 'rgba(10,10,13,.8)');
      g.addColorStop(1, 'rgba(10,10,13,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, py, pw, ph);
    }
    drawTag(ctx, tagText, margin, tagY, format);
    ctx.fillStyle = CREAM;
    ctx.font = `900 ${headSize}px 'Barlow Condensed', sans-serif`;
    lines.forEach((l, i) => ctx.fillText(l, margin, headBaselines[i]));
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(margin, ruleY);
    ctx.lineTo(margin + ruleW, ruleY);
    ctx.stroke();
    ctx.font = `900 ${nameSize}px 'Barlow Condensed', sans-serif`;
    ctx.fillStyle = CREAM;
    ctx.fillText(nameText, margin, nameBaseline);
    ctx.font = `800 ${posSize}px Inter, sans-serif`;
    ctx.fillStyle = GOLD;
    ctx.fillText(posText, margin, posBaseline);
    if (isTransfer && format === 'story') {
      const rowH = 260;
      const rowY = ch - 220 - rowH;
      ctx.fillStyle = 'rgba(18,18,22,.88)';
      ctx.fillRect(0, rowY, cw, rowH);
      const midY = rowY + rowH / 2;
      const fromBox = 136,
        toBox = 184;
      const fromCX = cw * 0.34,
        toCX = cw * 0.66;
      drawRivalCircle(ctx, fromCX, midY, fromBox / 2, rivalImg, texts.rival, forExport);
      if (crestImg) {
        const s = Math.min(toBox / crestImg.naturalWidth, toBox / crestImg.naturalHeight);
        const dw = crestImg.naturalWidth * s,
          dh = crestImg.naturalHeight * s;
        drawCrest(ctx, crestImg, toCX - dw / 2, midY - dh / 2, dw, dh);
      }
      const ax0 = fromCX + fromBox / 2 + 22,
        ax1 = toCX - toBox / 2 - 22;
      const head = 30;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 11;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.moveTo(ax0, midY);
      ctx.lineTo(ax1 - head, midY);
      ctx.stroke();
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(ax1, midY);
      ctx.lineTo(ax1 - head, midY - head * 0.72);
      ctx.lineTo(ax1 - head, midY + head * 0.72);
      ctx.closePath();
      ctx.fill();
      return rowY;
    }
  }
  function draw(ctx, state, opts = {}) {
    const {
      format,
      photoImg,
      panX,
      panY,
      scale,
      rotate,
      flipH,
      brightness,
      gradientStrength,
      rivalImg,
      crestImg,
      crestTransferImg,
      texts,
      showGuides,
      facePoint,
      templateType,
      venue
    } = state;
    const {
      w: cw,
      h: ch
    } = FORMATS[format];
    ctx.save();
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = GRAPHITE;
    ctx.fillRect(0, 0, cw, ch);
    drawPhoto(ctx, cw, ch, photoImg, panX, panY, scale, rotate, flipH, brightness);
    const gAlpha = gradientStrength / 100;
    let blockTop = null;
    if (templateType === 'matchday') blockTop = drawMatchday(ctx, cw, ch, format, texts, gAlpha, venue);else if (templateType === 'preview' || templateType === 'tournament') blockTop = drawPreview(ctx, cw, ch, format, texts, photoImg, panX, panY, scale, rotate, flipH, brightness, rivalImg, venue, opts.forExport, templateType);else if (templateType === 'goal') blockTop = drawGoal(ctx, cw, ch, format, texts, gAlpha);else if (templateType === 'result') blockTop = drawResult(ctx, cw, ch, format, texts, gAlpha, crestImg, rivalImg, venue, opts.forExport);else if (templateType === 'news' || templateType === 'transfer') blockTop = drawNews(ctx, cw, ch, format, texts, gAlpha, templateType === 'transfer' && crestTransferImg ? crestTransferImg : crestImg, rivalImg, opts.forExport, templateType === 'transfer');
    const hdrMargin = format === 'story' ? 48 : 40;
    const headerCrest = templateType === 'transfer' && crestTransferImg ? crestTransferImg : crestImg;
    if (format !== 'story' && !(templateType === 'result' && format === 'square')) drawClubHeader(ctx, cw, hdrMargin, format, headerCrest, templateType === 'transfer' ? true : templateType === 'news' ? 'light' : false);
    if (texts.cta && texts.cta.trim()) {
      const pillH = format === 'story' ? 72 : 56;
      const gap = format === 'story' ? 34 : 26;
      const floor = format === 'story' ? ch - 220 - 16 : ch - hdrMargin;
      const bottom = Math.min(floor, blockTop != null ? blockTop - gap : floor);
      const ctaTxt = texts.cta.toUpperCase();
      ctx.font = `800 ${format === 'story' ? 40 : 30}px Inter, sans-serif`;
      if (ctx.measureText(ctaTxt).width + 48 <= cw - hdrMargin * 2) {
        drawTag(ctx, ctaTxt, hdrMargin, bottom - pillH, format);
      }
    }
    if (showGuides && !opts.forExport) {
      ctx.save();
      ctx.strokeStyle = 'rgba(226,9,47,.85)';
      ctx.setLineDash([10, 8]);
      ctx.lineWidth = 3;
      if (format === 'story') {
        ctx.beginPath();
        ctx.moveTo(0, 220);
        ctx.lineTo(cw, 220);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, ch - 220);
        ctx.lineTo(cw, ch - 220);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(183,168,92,.9)';
      const margin = format === 'story' ? 48 : 40;
      ctx.strokeRect(margin, margin, cw - margin * 2, ch - margin * 2);
      const fx = facePoint.x * cw,
        fy = facePoint.y * ch;
      ctx.strokeStyle = '#E2092F';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(fx, fy, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fx - 46, fy);
      ctx.lineTo(fx + 46, fy);
      ctx.moveTo(fx, fy - 46);
      ctx.lineTo(fx, fy + 46);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ c >>> 8;
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function pngChunk(type, data) {
    const out = new Uint8Array(12 + data.length);
    const dv = new DataView(out.buffer);
    dv.setUint32(0, data.length);
    for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    out.set(data, 8);
    const forCrc = out.subarray(4, 8 + data.length);
    dv.setUint32(8 + data.length, crc32(forCrc));
    return out;
  }

  /** Insert sRGB + pHYs (72 DPI) chunks after IHDR so exported PNGs declare colour space and resolution. */
  async function tagPngSrgb72(blob) {
    const src = new Uint8Array(await blob.arrayBuffer());
    const ihdrEnd = 8 + 4 + 4 + 13 + 4;
    const srgb = pngChunk('sRGB', new Uint8Array([0]));
    const ppm = 2835;
    const physData = new Uint8Array(9);
    const pdv = new DataView(physData.buffer);
    pdv.setUint32(0, ppm);
    pdv.setUint32(4, ppm);
    physData[8] = 1;
    const phys = pngChunk('pHYs', physData);
    const out = new Uint8Array(src.length + srgb.length + phys.length);
    out.set(src.subarray(0, ihdrEnd), 0);
    out.set(srgb, ihdrEnd);
    out.set(phys, ihdrEnd + srgb.length);
    out.set(src.subarray(ihdrEnd), ihdrEnd + srgb.length + phys.length);
    return new Blob([out], {
      type: 'image/png'
    });
  }
  function exportPng(state, filename) {
    const {
      w,
      h
    } = FORMATS[state.format];
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', {
      colorSpace: 'srgb'
    });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    draw(ctx, state, {
      forExport: true
    });
    canvas.toBlob(async raw => {
      const blob = await tagPngSrgb72(raw);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, 'image/png');
  }
  function exportJpg(state, filename, quality) {
    const {
      w,
      h
    } = FORMATS[state.format];
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', {
      colorSpace: 'srgb'
    });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#121216';
    ctx.fillRect(0, 0, w, h);
    draw(ctx, state, {
      forExport: true
    });
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, 'image/jpeg', quality || 0.92);
  }
  window.PoloniaDraw = {
    draw,
    exportPng,
    exportJpg
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/graphic-generator/drawEngine.js", error: String((e && e.message) || e) }); }

// ui_kits/graphic-generator/templates.js
try { (() => {
(() => {
  const TEMPLATES = [{
    id: 'matchday',
    label: 'Dzień meczowy'
  }, {
    id: 'preview',
    label: 'Zapowiedź meczu'
  }, {
    id: 'tournament',
    label: 'Zapowiedź turnieju'
  }, {
    id: 'goal',
    label: 'Gol'
  }, {
    id: 'result',
    label: 'Wynik końcowy'
  }, {
    id: 'news',
    label: 'Aktualności'
  }, {
    id: 'transfer',
    label: 'Nowy zawodnik'
  }];
  const STATUS_LABEL = {
    win: 'ZWYCIĘSTWO!',
    draw: 'REMIS!',
    loss: 'PORAŻKA'
  };
  const FORMATS = {
    square: {
      w: 1080,
      h: 1080,
      label: '1:1 · Post'
    },
    story: {
      w: 1080,
      h: 1920,
      label: '9:16 · Relacja'
    }
  };
  function defaultState() {
    return {
      templateType: 'goal',
      format: 'square',
      venue: 'home',
      photoSrc: null,
      panX: 0,
      panY: 0,
      scale: 1.15,
      rotate: 0,
      flipH: false,
      facePoint: {
        x: 0.62,
        y: 0.32
      },
      brightness: -6,
      gradientStrength: 70,
      rivalCrestSrc: null,
      showGuides: true,
      texts: {
        date: '05.09.2026',
        day: 'SOBOTA',
        time: '20:00',
        stadion: 'CHEM. DU STRUYKBEKEN 2, 1200 BRUKSELA',
        rival: 'RYWAL FC',
        tournamentName: 'TURNIEJ POLONII',
        playerName: 'JAN KOWALSKI',
        playerPos: 'NAPASTNIK',
        newsHeadline: 'AKTUALNOŚCI',
        minute: '17',
        scorer: 'JAN KOWALSKI',
        scoreHome: '3',
        scoreAway: '1',
        status: 'win',
        cta: ''
      }
    };
  }
  window.PoloniaTemplates = {
    TEMPLATES,
    STATUS_LABEL,
    FORMATS,
    defaultState
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/graphic-generator/templates.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
