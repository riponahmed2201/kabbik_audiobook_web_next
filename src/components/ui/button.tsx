import React from 'react'
import styles from '@/components/ui/static/styles.module.css';
import { spinnerClassNames } from './static/tailwind.classes';
import { TCommonBtnProps } from './static/types';

const CommonButton = (props:TCommonBtnProps) => {
  const {isLoading,disabled,children,handleClick,className,addiTionalClass} = props;
  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      type='button'
      className={className ?? `${styles.commounBtnBg} px-5 py-0.5 rounded flex items-center justify-center ${addiTionalClass}`}
    >
      {isLoading?
      <div className={spinnerClassNames()}></div>
      :''}
      {children}
    </button>
  )
}

export default CommonButton