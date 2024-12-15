export const Filter = ({ value, onChange }) => {
  return (
    <label>
      Filter by Name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};
