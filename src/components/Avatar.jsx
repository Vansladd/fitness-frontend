// components/Avatar.jsx
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';

const Avatar = ({ seed = "default-user", size = 96 }) => {
  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      seed,
      size,
    }).toDataUri();
  }, [seed, size]);

  return <img src={avatar} alt="User Avatar" className="rounded-full" />;
};

export default Avatar;
