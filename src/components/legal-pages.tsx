import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

export type LegalDocId = 'privacy' | 'terms' | 'refunds' | 'deletion'

type Props = { doc: LegalDocId; onNavigate: (doc: LegalDocId) => void; onClose: () => void }

const TABS: { id: LegalDocId; label: string }[] = [
  { id: 'privacy', label: 'Privacidad' },
  { id: 'terms', label: 'Términos y condiciones' },
  { id: 'refunds', label: 'Reembolsos' },
  { id: 'deletion', label: 'Borrado de datos' },
]

const CONTACT_EMAIL = 'kyva1103@gmail.com'
const LAST_UPDATED = '11 de septiembre de 2026'

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-9 text-xl font-bold tracking-[-.02em] text-[#161512]">{children}</h2>
)
const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 max-w-2xl text-[#3f3b32]">{children}</p>
)
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-[#3f3b32]">{children}</ul>
)

function Privacy() {
  return (
    <>
      <P>
        Esta política explica qué datos recopila <b>CuentosMati</b>, para qué los usamos y cómo
        pueden los padres, madres o tutores (las únicas personas que abren una cuenta) ejercer sus
        derechos. La aplicación está pensada para que un adulto responsable cree la cuenta y
        configure el perfil de cada niño o niña; los menores no se registran por su cuenta ni
        entregan sus propios datos de contacto.
      </P>

      <H2>Quién trata tus datos</H2>
      <P>
        CuentosMati es operado por <b>Beniel Studio</b> (Nick Ledesma). Para cualquier consulta
        sobre privacidad, escribe a <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </P>

      <H2>Qué datos recopilamos</H2>
      <UL>
        <li><b>Cuenta del adulto:</b> nombre, correo electrónico y contraseña (guardada siempre cifrada, nunca en texto plano).</li>
        <li><b>Perfil infantil:</b> un apodo elegido por la familia, un avatar de una lista predefinida y una edad aproximada (3 a 12 años). No pedimos el nombre real, ni foto, ni datos de contacto del niño o niña.</li>
        <li><b>Progreso de juego:</b> cualidades del personaje (valentía, ingenio, amistad), cuentos completados y desbloqueados, e inventario dentro de la app.</li>
        <li><b>Cuentos creados:</b> el texto de cada capítulo, las decisiones tomadas y, si el niño escribe un personaje libre, ese texto se envía a un proveedor de inteligencia artificial para generar la historia (ver "Con quién compartimos datos").</li>
        <li><b>Datos de compra:</b> el paquete de monedas elegido, el monto, la moneda (soles) y el estado del pago. Los datos de tu tarjeta o método de pago los recibe y procesa Mercado Pago directamente: nuestros servidores nunca ven ni guardan el número de tu tarjeta.</li>
        <li><b>Datos técnicos:</b> un token de sesión guardado en el navegador (localStorage) para mantenerte con la sesión iniciada. No usamos cookies de publicidad ni de analítica de terceros. Los servidores donde corre CuentosMati pueden generar registros técnicos estándar (IP, fecha, hora) por motivos de seguridad, como cualquier servicio en internet.</li>
      </UL>

      <H2>Para qué usamos estos datos</H2>
      <UL>
        <li>Crear y generar los cuentos e ilustraciones de cada perfil infantil.</li>
        <li>Guardar el progreso, las monedas disponibles y la biblioteca de cuentos de la familia.</li>
        <li>Procesar los pagos de monedas a través de Mercado Pago y acreditarlas a la cuenta correcta.</li>
        <li>Dar soporte cuando escribes a nuestro correo de contacto.</li>
        <li>Cumplir obligaciones legales, por ejemplo las contables o tributarias asociadas a un pago.</li>
      </UL>

      <H2>Con quién compartimos datos</H2>
      <P>No vendemos datos personales. Compartimos lo mínimo necesario con proveedores que nos ayudan a operar:</P>
      <UL>
        <li><b>Mercado Pago (Perú):</b> procesa el cobro de las monedas; recibe tu nombre, correo y el monto de la compra.</li>
        <li><b>Proveedores de inteligencia artificial</b> (para generar el texto y las ilustraciones de los cuentos): reciben el texto del personaje o la historia en curso para producir el siguiente capítulo o imagen. No los usamos para entrenar modelos con fines ajenos a CuentosMati ni les enviamos tu nombre o correo.</li>
        <li><b>Proveedor de alojamiento de imágenes y de servidores:</b> las ilustraciones generadas y la base de datos de la app se guardan en servidores de terceros contratados por Beniel Studio, algunos ubicados fuera de Perú (por ejemplo, en Europa o Estados Unidos). Al usar CuentosMati aceptas esta transferencia internacional, necesaria para que el servicio funcione.</li>
      </UL>

      <H2>Cuánto tiempo guardamos tus datos</H2>
      <P>
        Mientras tu cuenta esté activa. Si pides eliminarla (ver "Borrado de datos"), la borramos
        salvo la información que debamos conservar por ley, como los registros de una compra, que
        pueden conservarse el tiempo que exige la normativa tributaria peruana.
      </P>

      <H2>Tus derechos</H2>
      <P>
        Conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, puedes pedir
        acceso, rectificación, cancelación (eliminación) u oposición al tratamiento de los datos de
        tu familia escribiendo a <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        Responderemos en un plazo razonable, no mayor a 10 días hábiles.
      </P>

      <H2>Cambios a esta política</H2>
      <P>
        Si actualizamos esta política, cambiaremos la fecha abajo y, si el cambio es relevante, te
        avisaremos dentro de la app.
      </P>
      <P><i>Última actualización: {LAST_UPDATED}.</i></P>
    </>
  )
}

function Terms() {
  return (
    <>
      <P>
        Estos Términos y Condiciones rigen el uso de <b>CuentosMati</b>, operado por{' '}
        <b>Beniel Studio</b> (Nick Ledesma). Al crear una cuenta, la persona adulta que la crea
        declara ser mayor de edad y responsable de los perfiles infantiles que configure dentro de
        ella.
      </P>

      <H2>Quién puede usar CuentosMati</H2>
      <P>
        La cuenta la abre y administra un adulto (padre, madre o tutor). Los perfiles infantiles
        viven dentro de esa cuenta y son de uso supervisado por el adulto responsable.
      </P>

      <H2>Las monedas y los créditos</H2>
      <P>
        CuentosMati funciona con monedas (créditos) que se usan para crear nuevas historias. Las
        monedas se compran en paquetes con precio en soles (S/) y se pagan mediante Mercado Pago.
        Las monedas no son dinero, no generan intereses y no pueden transferirse a otra cuenta ni
        canjearse por dinero salvo lo indicado en la Política de Reembolsos.
      </P>

      <H2>Contenido generado por la app</H2>
      <P>
        Los cuentos, textos e ilustraciones que genera CuentosMati para tu familia se crean
        automáticamente a partir de las elecciones del niño o niña, con apoyo de proveedores de
        inteligencia artificial. Aplicamos filtros para mantener el contenido apropiado para
        infancias, pero al ser contenido generado automáticamente puede ocasionalmente contener
        errores; pedimos a los adultos supervisar la lectura y contactarnos si algo no es
        apropiado.
      </P>

      <H2>Uso aceptable</H2>
      <UL>
        <li>No está permitido usar la cuenta para introducir contenido ofensivo, violento o inapropiado en los campos de texto libre.</li>
        <li>No está permitido intentar vulnerar, revender o automatizar el acceso a la plataforma.</li>
        <li>Nos reservamos el derecho de suspender cuentas que incumplan estos términos.</li>
      </UL>

      <H2>Pagos</H2>
      <P>
        Los pagos se procesan a través de Mercado Pago. CuentosMati no almacena los datos de tu
        tarjeta. Ver la <b>Política de Reembolsos</b> para las condiciones de cada compra.
      </P>

      <H2>Disponibilidad del servicio</H2>
      <P>
        CuentosMati es un servicio en desarrollo activo. Podemos actualizar, pausar o modificar
        funciones sin previo aviso, procurando siempre no afectar el acceso a los cuentos ya
        guardados.
      </P>

      <H2>Ley aplicable</H2>
      <P>Estos términos se rigen por las leyes de la República del Perú.</P>

      <H2>Contacto</H2>
      <P>
        Preguntas sobre estos términos: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </P>
      <P><i>Última actualización: {LAST_UPDATED}.</i></P>
    </>
  )
}

function Refunds() {
  return (
    <>
      <P>
        Antes de pagar, se te muestra el paquete de monedas y su precio en soles. Al confirmar el
        pago en Mercado Pago aceptas esta política.
      </P>

      <H2>Todas las compras son finales</H2>
      <P>
        Las monedas se acreditan a tu cuenta apenas Mercado Pago confirma el pago. Por tratarse de
        un contenido digital que se entrega de inmediato, <b>no se realizan reembolsos</b> por
        cambio de opinión, por no haber usado las monedas, o porque el niño o niña ya no quiera
        seguir jugando.
      </P>

      <H2>Excepción: falla técnica de nuestro lado</H2>
      <P>
        Si Mercado Pago cobró tu pago pero las monedas <b>no</b> llegaron a tu cuenta por un error
        de CuentosMati, escríbenos a{' '}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> con el
        correo de tu cuenta y la fecha del pago: acreditaremos las monedas faltantes o gestionaremos
        la devolución del cobro, sin costo para ti. Esta excepción no aplica si las monedas sí se
        acreditaron.
      </P>

      <H2>Cobros duplicados o no reconocidos</H2>
      <P>
        Si ves un cargo de Mercado Pago que no reconoces o que se hizo dos veces, contáctanos de
        inmediato para revisarlo.
      </P>
      <P><i>Última actualización: {LAST_UPDATED}.</i></P>
    </>
  )
}

function Deletion() {
  return (
    <>
      <P>
        Puedes pedir la eliminación de la cuenta de tu familia (datos del adulto, perfiles
        infantiles, cuentos guardados y progreso) en cualquier momento.
      </P>

      <H2>Cómo pedirlo</H2>
      <P>
        Escribe a <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
        desde el correo con el que creaste la cuenta, indicando que quieres borrar tus datos.
        Podemos pedirte una confirmación para verificar que eres el titular de la cuenta.
      </P>

      <H2>Qué se elimina</H2>
      <UL>
        <li>El nombre y correo del adulto, y la contraseña.</li>
        <li>Todos los perfiles infantiles asociados: apodo, avatar, edad, cualidades y progreso.</li>
        <li>Los cuentos guardados y sus ilustraciones.</li>
      </UL>

      <H2>Qué podemos conservar</H2>
      <P>
        Los registros de pagos (monto, fecha, estado) pueden conservarse el tiempo que exige la
        normativa tributaria y contable peruana, incluso después de borrar la cuenta, y de forma
        separada de tu identidad para otros fines.
      </P>

      <H2>Plazo</H2>
      <P>
        Procesamos las solicitudes de borrado en un plazo razonable, no mayor a 10 días hábiles.
      </P>
      <P><i>Última actualización: {LAST_UPDATED}.</i></P>
    </>
  )
}

export function LegalPages({ doc, onNavigate, onClose }: Props) {
  const Content = doc === 'privacy' ? Privacy : doc === 'terms' ? Terms : doc === 'refunds' ? Refunds : Deletion
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fbf7ee]">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="quiet-button mb-6 text-[#5b574c] hover:text-[#161512]"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Volver a CuentosMati
        </button>
        <nav className="flex flex-wrap gap-2 border-b border-[#ded9cc] pb-4" aria-label="Documentos legales">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={doc === tab.id ? 'page' : undefined}
              className={
                doc === tab.id
                  ? 'bg-[#ffcf22] px-4 py-2 text-sm font-bold text-[#161512]'
                  : 'bg-transparent px-4 py-2 text-sm font-bold text-[#5b574c] hover:text-[#161512]'
              }
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <article>
          <Content />
        </article>
      </div>
    </div>
  )
}
