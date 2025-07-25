export default function BaseButton(props) {
  const { label, typeBtn, colorBtn, text, onClick, disabled, width, icon} = props;
  return (
    <button
      type={typeBtn}
      style={{ background: colorBtn || "#51a2ff", 
      color: text || 'white', 
      width: width,
      }}
      className={icon ? 'flex items-center gap-2' : ''}
      onClick={onClick}
      disabled={disabled}
    >
      {label} {icon}

    </button>
  );
}
