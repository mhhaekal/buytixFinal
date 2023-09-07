function Checkbox(props) {
  return (
    <div className="flex flex-row py-2">
      <input
        className="checkbox checkbox-primary py-2"
        type="checkbox"
        // value={props.value}
        onChange={() => props.handleFunction(props.typeId)}
      />
      <div className="pl-2">{props.typeName}</div>
    </div>
  );
}

export default Checkbox;
