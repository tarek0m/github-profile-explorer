'use client';

import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image
          src='/github.svg'
          alt='GitHub Logo'
          width={40}
          height={40}
          style={{ filter: 'invert(1)' }}
        />
      </div>
      <h1 className={styles.title}>GitHub Profile Explorer</h1>
    </div>
  );
}
