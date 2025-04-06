// components/AvatarPicker.jsx
import Avatar from './Avatar';

const seeds = ['panda123', 'spaceRex', 'ninjaFox', 'coolCat', 'cyberWolf'];

const AvatarPicker = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {seeds.map((seed) => (
        <div
          key={seed}
          onClick={() => onSelect(seed)}
          className={`cursor-pointer border rounded-xl p-2 transition ${
            seed === selected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'
          }`}
        >
          <Avatar seed={seed} />
          <p className="text-center text-sm mt-2">{seed}</p>
        </div>
      ))}
    </div>
  );
};

export default AvatarPicker;
