interface modalDeleteHeroProps {
  confirm: () => void;
  cancel: () => void;
}
export const ModalDeleteHero = ({ confirm, cancel } : modalDeleteHeroProps) =>{
  return (
    <div
    className="w-full h-full bg-white
    flex flex-col items-center justify-center absolute z-20">
      <p>Tem certeza que deseja deletar o herói?</p>
      <span className="moda-actions">
        <button type='button'
        onClick={cancel}>Cancelar</button>
        <button type='button' 
        className="btn-danger"
        onClick={confirm}>Deletar</button>
      </span>
    </div>
  )
}