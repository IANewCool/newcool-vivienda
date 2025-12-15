'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SERVIU por region
const OFICINAS_SERVIU = [
  { id: 1, nombre: 'SERVIU Metropolitano', direccion: 'Serrano 45', ciudad: 'Santiago', region: 'Metropolitana', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 2, nombre: 'SERVIU Valparaiso', direccion: 'Melgarejo 669', ciudad: 'Valparaiso', region: 'Valparaiso', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 3, nombre: 'SERVIU Biobio', direccion: 'Prat 525', ciudad: 'Concepcion', region: 'Biobio', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 4, nombre: 'SERVIU Maule', direccion: '1 Sur 850', ciudad: 'Talca', region: 'Maule', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 5, nombre: 'SERVIU Araucania', direccion: 'Claro Solar 950', ciudad: 'Temuco', region: 'La Araucania', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 6, nombre: 'SERVIU Los Lagos', direccion: 'OHiggins 480', ciudad: 'Puerto Montt', region: 'Los Lagos', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 7, nombre: 'SERVIU OHiggins', direccion: 'Campos 360', ciudad: 'Rancagua', region: 'OHiggins', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 8, nombre: 'SERVIU Coquimbo', direccion: 'Matta 461', ciudad: 'La Serena', region: 'Coquimbo', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 9, nombre: 'SERVIU Antofagasta', direccion: 'Matta 2232', ciudad: 'Antofagasta', region: 'Antofagasta', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 10, nombre: 'SERVIU Tarapaca', direccion: 'Patricio Lynch 575', ciudad: 'Iquique', region: 'Tarapaca', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 11, nombre: 'SERVIU Atacama', direccion: 'Copiapo 525', ciudad: 'Copiapo', region: 'Atacama', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 12, nombre: 'SERVIU Los Rios', direccion: 'Picarte 408', ciudad: 'Valdivia', region: 'Los Rios', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 13, nombre: 'SERVIU Aysen', direccion: 'Moraleda 343', ciudad: 'Coyhaique', region: 'Aysen', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 14, nombre: 'SERVIU Magallanes', direccion: 'Bories 901', ciudad: 'Punta Arenas', region: 'Magallanes', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 15, nombre: 'SERVIU Arica', direccion: 'Prat 375', ciudad: 'Arica', region: 'Arica y Parinacota', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
  { id: 16, nombre: 'SERVIU Nuble', direccion: 'Constitucion 550', ciudad: 'Chillan', region: 'Nuble', telefono: '600 730 0000', horario: 'Lun-Vie 8:30-14:00' },
];

// Subsidios habitacionales
const SUBSIDIOS = [
  {
    nombre: 'DS49 - Fondo Solidario',
    tipo: 'Sin credito',
    tramo: 'Hasta 40% RSH',
    subsidio: 800,
    ahorro: 10,
    descripcion: 'Vivienda social sin credito hipotecario',
    requisitos: ['40% mas vulnerable RSH', 'Sin vivienda', 'Grupo familiar'],
    modalidades: ['Construccion en sitio propio', 'Construccion en nuevos terrenos', 'Adquisicion de vivienda construida']
  },
  {
    nombre: 'DS1 - Subsidio Habitacional',
    tipo: 'Con credito',
    tramo: 'Hasta 90% RSH',
    subsidio: 500,
    ahorro: 50,
    descripcion: 'Subsidio para compra con credito hipotecario',
    requisitos: ['Hasta 90% RSH', 'Capacidad de ahorro', 'Sin vivienda'],
    modalidades: ['Tramo 1 (hasta 50% RSH)', 'Tramo 2 (50-70% RSH)', 'Tramo 3 (70-90% RSH)']
  },
  {
    nombre: 'DS19 - Integracion Social',
    tipo: 'Mixto',
    tramo: 'Hasta 90% RSH',
    subsidio: 550,
    ahorro: 30,
    descripcion: 'Proyectos con integracion de distintos sectores',
    requisitos: ['Hasta 90% RSH', 'Proyecto de integracion', 'Sin vivienda'],
    modalidades: ['Subsidio base', 'Subsidio diferenciado', 'Incentivo integracion']
  },
  {
    nombre: 'DS27 - Arriendo',
    tipo: 'Arriendo',
    tramo: 'Hasta 50% RSH',
    subsidio: 200,
    ahorro: 0,
    descripcion: 'Subsidio mensual para arriendo',
    requisitos: ['Hasta 50% RSH', 'Contrato de arriendo', 'Sin vivienda propia'],
    modalidades: ['Arriendo regular', 'Arriendo adulto mayor', 'Arriendo con opcion de compra']
  },
  {
    nombre: 'DS255 - Clase Media',
    tipo: 'Clase Media',
    tramo: '70% a 90% RSH',
    subsidio: 300,
    ahorro: 100,
    descripcion: 'Subsidio para sectores medios',
    requisitos: ['70% al 90% RSH', 'Credito preaprobado', 'Sin vivienda'],
    modalidades: ['Tramo 1', 'Tramo 2', 'Tramo 3']
  },
  {
    nombre: 'DS10 - Mejoramiento',
    tipo: 'Mejoramiento',
    tramo: 'Hasta 70% RSH',
    subsidio: 150,
    ahorro: 20,
    descripcion: 'Reparacion y mejoramiento de vivienda',
    requisitos: ['Propietario de vivienda', 'Hasta 70% RSH', 'Vivienda con deterioro'],
    modalidades: ['Ampliacion', 'Reparacion', 'Mejoramiento termico']
  },
];

// Tramos de ahorro y subsidio por UF
const TRAMOS_SUBSIDIO = {
  ds49: { subsidioMax: 800, ahorroMin: 10, valorVivienda: 950 },
  ds1_t1: { subsidioMax: 500, ahorroMin: 30, valorVivienda: 1100 },
  ds1_t2: { subsidioMax: 400, ahorroMin: 40, valorVivienda: 1400 },
  ds1_t3: { subsidioMax: 300, ahorroMin: 50, valorVivienda: 1600 },
  ds255_t1: { subsidioMax: 300, ahorroMin: 80, valorVivienda: 2200 },
  ds255_t2: { subsidioMax: 200, ahorroMin: 100, valorVivienda: 2600 },
};

// Proceso de postulacion
const PROCESO_POSTULACION = [
  { etapa: 1, titulo: 'Registro Social de Hogares', descripcion: 'Actualizar RSH en municipalidad o registrosocial.gob.cl', plazo: 'Previo', documentos: 'Cedula, certificados ingresos' },
  { etapa: 2, titulo: 'Ahorro en cuenta vivienda', descripcion: 'Abrir cuenta de ahorro para vivienda en banco', plazo: '12+ meses', documentos: 'Cedula, libreta de ahorro' },
  { etapa: 3, titulo: 'Inscripcion en llamado', descripcion: 'Postular en periodo de llamado en SERVIU o EGIS', plazo: 'Segun llamado', documentos: 'Formulario, RSH, ahorro' },
  { etapa: 4, titulo: 'Evaluacion y seleccion', descripcion: 'SERVIU evalua segun puntaje y cupos disponibles', plazo: '2-6 meses', documentos: 'Automatico' },
  { etapa: 5, titulo: 'Asignacion de subsidio', descripcion: 'Notificacion de subsidio aprobado', plazo: '1 mes', documentos: 'Certificado subsidio' },
  { etapa: 6, titulo: 'Uso del subsidio', descripcion: 'Comprar o construir vivienda en plazo establecido', plazo: '21-24 meses', documentos: 'Escritura, credito' },
];

// Glosario vivienda
const GLOSARIO = [
  { termino: 'UF', definicion: 'Unidad de Fomento, valor reajustable usado en subsidios y creditos hipotecarios' },
  { termino: 'RSH', definicion: 'Registro Social de Hogares, determina vulnerabilidad socioeconomica del 0 al 100%' },
  { termino: 'SERVIU', definicion: 'Servicio de Vivienda y Urbanizacion, ejecuta politicas habitacionales' },
  { termino: 'EGIS', definicion: 'Entidad de Gestion Inmobiliaria Social, asesora en postulacion a subsidios' },
  { termino: 'DS49', definicion: 'Decreto Supremo 49, Fondo Solidario de Eleccion de Vivienda sin credito' },
  { termino: 'DS1', definicion: 'Decreto Supremo 1, Sistema Integrado de Subsidio Habitacional con credito' },
  { termino: 'Subsidio habitacional', definicion: 'Aporte estatal no reembolsable para adquirir vivienda' },
  { termino: 'Cuenta de ahorro vivienda', definicion: 'Cuenta especial para acumular ahorro exigido por subsidio' },
  { termino: 'Credito hipotecario', definicion: 'Prestamo bancario para compra de vivienda, usando esta como garantia' },
  { termino: 'Dividendo', definicion: 'Cuota mensual del credito hipotecario' },
  { termino: 'Pie', definicion: 'Pago inicial al comprar vivienda (ahorro + subsidio + complemento)' },
  { termino: 'Escritura', definicion: 'Documento legal que formaliza la compra de propiedad' },
];

// Valor UF actual (ejemplo)
const UF_VALOR = 38500;

export default function ViviendaChile() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora
  const [valorVivienda, setValorVivienda] = useState('1200');
  const [ahorroActual, setAhorroActual] = useState('30');
  const [tipoSubsidio, setTipoSubsidio] = useState('ds1_t1');
  const [ingresoMensual, setIngresoMensual] = useState('800000');

  const oficinasFiltradas = OFICINAS_SERVIU.filter(oficina =>
    oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    oficina.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
    oficina.region.toLowerCase().includes(busqueda.toLowerCase())
  );

  const calcularFinanciamiento = () => {
    const viviendaUF = parseFloat(valorVivienda) || 0;
    const ahorro = parseFloat(ahorroActual) || 0;
    const tramo = TRAMOS_SUBSIDIO[tipoSubsidio as keyof typeof TRAMOS_SUBSIDIO];

    if (!tramo) return null;

    const subsidioAplicable = Math.min(tramo.subsidioMax, viviendaUF - ahorro);
    const montoCredito = Math.max(0, viviendaUF - ahorro - subsidioAplicable);
    const ahorroFaltante = Math.max(0, tramo.ahorroMin - ahorro);

    // Calculo dividendo aproximado (20 anos, 4% anual)
    const tasaMensual = 0.04 / 12;
    const numCuotas = 20 * 12;
    const dividendoUF = montoCredito > 0
      ? (montoCredito * tasaMensual * Math.pow(1 + tasaMensual, numCuotas)) / (Math.pow(1 + tasaMensual, numCuotas) - 1)
      : 0;

    const dividendoPesos = dividendoUF * UF_VALOR;
    const ingreso = parseFloat(ingresoMensual) || 0;
    const cargaFinanciera = ingreso > 0 ? (dividendoPesos / ingreso) * 100 : 0;

    return {
      viviendaUF,
      viviendaPesos: viviendaUF * UF_VALOR,
      ahorro,
      ahorroFaltante,
      subsidioAplicable,
      montoCredito,
      dividendoUF,
      dividendoPesos,
      cargaFinanciera,
      esViable: cargaFinanciera <= 25 && ahorroFaltante === 0
    };
  };

  const financiamiento = calcularFinanciamiento();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-green-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🏠</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Vivienda Chile
            </h1>
            <p className="text-emerald-100">
              Subsidios habitacionales, SERVIU y programas de vivienda
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-slate-800/50 backdrop-blur sticky top-0 z-40 border-b border-emerald-500/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'buscador', icon: '🔍', label: 'Oficinas SERVIU' },
              { id: 'subsidios', icon: '🏡', label: 'Subsidios' },
              { id: 'calculadora', icon: '🧮', label: 'Calculadora' },
              { id: 'proceso', icon: '📋', label: 'Postulacion' },
              { id: 'glosario', icon: '📖', label: 'Glosario' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Oficinas SERVIU */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-emerald-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Oficinas SERVIU
              </h2>

              <input
                type="text"
                placeholder="Buscar por region o ciudad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
              />

              <p className="text-sm text-emerald-400 mt-4">
                {oficinasFiltradas.length} oficinas encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {oficinasFiltradas.map((oficina, i) => (
                <motion.div
                  key={oficina.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all"
                >
                  <h3 className="font-bold text-white mb-3">{oficina.nombre}</h3>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-emerald-400">Direccion:</span> {oficina.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-emerald-400">Ciudad:</span> {oficina.ciudad}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-emerald-400">Region:</span> {oficina.region}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-emerald-400">Telefono:</span> {oficina.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-emerald-400">Horario:</span> {oficina.horario}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/30">
              <p className="text-emerald-300 text-sm">
                <strong>Atencion:</strong> Para tramites presenciales se recomienda agendar hora en{' '}
                <a href="https://www.serviu.cl" target="_blank" className="underline hover:text-white">
                  serviu.cl
                </a>
              </p>
            </div>
          </motion.section>
        )}

        {/* Subsidios */}
        {seccionActiva === 'subsidios' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🏡</span> Subsidios Habitacionales
            </h2>

            <div className="space-y-4">
              {SUBSIDIOS.map((subsidio, i) => (
                <motion.div
                  key={subsidio.nombre}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{subsidio.nombre}</h3>
                      <p className="text-gray-400">{subsidio.descripcion}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm">
                        {subsidio.tipo}
                      </span>
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                        {subsidio.tramo}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                      <p className="text-emerald-400 text-sm">Subsidio maximo</p>
                      <p className="text-xl font-bold text-white">{subsidio.subsidio} UF</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                      <p className="text-emerald-400 text-sm">Ahorro minimo</p>
                      <p className="text-xl font-bold text-white">{subsidio.ahorro} UF</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                      <p className="text-emerald-400 text-sm">Modalidades</p>
                      <p className="text-xl font-bold text-white">{subsidio.modalidades.length}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Requisitos:</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {subsidio.requisitos.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-500">•</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Modalidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {subsidio.modalidades.map((mod) => (
                          <span key={mod} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Calculadora */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Subsidio Habitacional
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-emerald-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Datos de tu vivienda</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tipo de subsidio</label>
                    <select
                      value={tipoSubsidio}
                      onChange={(e) => setTipoSubsidio(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="ds49">DS49 - Fondo Solidario (sin credito)</option>
                      <option value="ds1_t1">DS1 Tramo 1 - Hasta 50% RSH</option>
                      <option value="ds1_t2">DS1 Tramo 2 - 50% a 70% RSH</option>
                      <option value="ds1_t3">DS1 Tramo 3 - 70% a 90% RSH</option>
                      <option value="ds255_t1">DS255 Clase Media - Tramo 1</option>
                      <option value="ds255_t2">DS255 Clase Media - Tramo 2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Valor vivienda (UF)</label>
                    <input
                      type="number"
                      value={valorVivienda}
                      onChange={(e) => setValorVivienda(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ahorro actual (UF)</label>
                    <input
                      type="number"
                      value={ahorroActual}
                      onChange={(e) => setAhorroActual(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ingreso mensual familiar ($)</label>
                    <input
                      type="number"
                      value={ingresoMensual}
                      onChange={(e) => setIngresoMensual(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Valor UF referencial: ${UF_VALOR.toLocaleString('es-CL')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 backdrop-blur rounded-2xl p-6 border border-emerald-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Resumen financiero</h3>

                {financiamiento && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Valor vivienda</span>
                      <span className="font-bold">{financiamiento.viviendaUF} UF (${financiamiento.viviendaPesos.toLocaleString('es-CL')})</span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>Tu ahorro</span>
                      <span className="font-bold">{financiamiento.ahorro} UF</span>
                    </div>

                    {financiamiento.ahorroFaltante > 0 && (
                      <div className="flex justify-between text-orange-300">
                        <span>Ahorro faltante</span>
                        <span className="font-bold">{financiamiento.ahorroFaltante} UF</span>
                      </div>
                    )}

                    <div className="flex justify-between text-emerald-300">
                      <span>Subsidio estimado</span>
                      <span className="font-bold">{financiamiento.subsidioAplicable} UF</span>
                    </div>

                    <div className="border-t border-emerald-500/30 pt-4">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Credito necesario</span>
                        <span className="text-emerald-400">{financiamiento.montoCredito.toFixed(0)} UF</span>
                      </div>
                    </div>

                    {financiamiento.dividendoUF > 0 && (
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">Dividendo mensual estimado (20 anos, 4%)</p>
                        <p className="text-2xl font-bold text-white">
                          ${Math.round(financiamiento.dividendoPesos).toLocaleString('es-CL')}/mes
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          ({financiamiento.dividendoUF.toFixed(2)} UF)
                        </p>
                      </div>
                    )}

                    <div className={`rounded-lg p-4 border ${
                      financiamiento.esViable
                        ? 'bg-green-900/30 border-green-500/30'
                        : 'bg-orange-900/30 border-orange-500/30'
                    }`}>
                      <p className={financiamiento.esViable ? 'text-green-300' : 'text-orange-300'}>
                        <strong>Carga financiera:</strong> {financiamiento.cargaFinanciera.toFixed(1)}% de tu ingreso
                      </p>
                      <p className={`text-sm mt-1 ${financiamiento.esViable ? 'text-green-300/70' : 'text-orange-300/70'}`}>
                        {financiamiento.esViable
                          ? 'Financiamiento viable (menos del 25% de ingresos)'
                          : 'Se recomienda que el dividendo no supere el 25% de ingresos'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Proceso de Postulacion */}
        {seccionActiva === 'proceso' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📋</span> Proceso de Postulacion a Subsidio
            </h2>

            <div className="relative">
              {PROCESO_POSTULACION.map((etapa, i) => (
                <motion.div
                  key={etapa.etapa}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 mb-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                      {etapa.etapa}
                    </div>
                    {i < PROCESO_POSTULACION.length - 1 && (
                      <div className="w-0.5 h-full bg-emerald-500/30 mt-2" />
                    )}
                  </div>

                  <div className="flex-1 bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{etapa.titulo}</h3>
                      <span className="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm">
                        {etapa.plazo}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{etapa.descripcion}</p>
                    <div className="text-sm">
                      <span className="text-emerald-400">Documentos:</span>{' '}
                      <span className="text-gray-400">{etapa.documentos}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30 mt-6">
              <h4 className="font-bold text-yellow-400 mb-2">Recomendaciones:</h4>
              <ul className="text-sm text-yellow-200/80 space-y-1">
                <li>• Mantenga su RSH actualizado (actualizacion anual)</li>
                <li>• Ahorre de forma constante en cuenta de ahorro para vivienda</li>
                <li>• Consulte con una EGIS para asesoramiento gratuito</li>
                <li>• Este atento a los llamados de postulacion (febrero-marzo generalmente)</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario de Vivienda
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-emerald-400 mb-2">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-emerald-500/30 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bold text-white mb-2">SERVIU</h4>
              <a href="https://www.serviu.cl" target="_blank" className="text-emerald-400 hover:underline text-sm">
                serviu.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Minvu</h4>
              <a href="https://www.minvu.cl" target="_blank" className="text-emerald-400 hover:underline text-sm">
                minvu.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Registro Social</h4>
              <a href="https://www.registrosocial.gob.cl" target="_blank" className="text-emerald-400 hover:underline text-sm">
                registrosocial.gob.cl
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Parte de{' '}
              <a href="https://newcool-informada.vercel.app" className="text-emerald-400 hover:underline">
                NewCooltura Informada
              </a>
              {' '}- Informacion ciudadana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
