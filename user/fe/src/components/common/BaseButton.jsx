export default function BaseButton(props) {
  const { label, typeBtn, colorBtn, text, onClick, disabled, className, width } = props;
  return (
    <button
      type={typeBtn}
      style={{ background: colorBtn || "#51a2ff", color: text, width: width }}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
