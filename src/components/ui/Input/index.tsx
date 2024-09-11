import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className={classNames(styles.inputWrapper, className)}>
      <input ref={ref} className={styles.input} role="textbox" {...props} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
