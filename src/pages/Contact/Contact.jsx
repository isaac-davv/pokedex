import { useForm } from 'react-hook-form'
import './Contact.css'

const Contact = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm()

  const onSubmit = (data) => {
    console.log('Datos enviados:', data)
    alert('¡Mensaje enviado correctamente!')
    reset()
  }

  return (
    <main className="contact">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-subtitle">¿Encontraste algún error? ¿Tienes sugerencias?</p>

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'El nombre es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'El email es obligatorio',
              pattern: { 
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                message: 'Email no válido' 
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <select 
            id="subject"
            {...register('subject', { required: 'Selecciona un asunto' })}
          >
            <option value="">Selecciona una opción</option>
            <option value="error">Reportar error</option>
            <option value="suggestion">Sugerencia</option>
            <option value="other">Otro</option>
          </select>
          {errors.subject && <span className="error">{errors.subject.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows="5"
            {...register('message', { 
              required: 'El mensaje es obligatorio',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' }
            })}
          ></textarea>
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>

        <button type="submit" className="submit-button">Enviar mensaje</button>
      </form>
    </main>
  )
}

export default Contact