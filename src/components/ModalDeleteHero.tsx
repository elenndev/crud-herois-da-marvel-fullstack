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
      <span className="moda-actions flex flex-row gap-2">
        <button type='button'
        className='btn-blue py-0.5 px-5 rounded-[3rem]'
        onClick={cancel}>Cancelar</button>
        <button type='button' 
        className="btn-danger py-0.5 px-5 rounded-[3rem]"
        onClick={confirm}>Deletar</button>
      </span>
    </div>
  )
}