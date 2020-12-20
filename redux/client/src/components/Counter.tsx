import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../modules/counter";

const Counter: FC = () => {
  const {
    counter: { number },
  } = useSelector((state) => state as any);
  const dispatch = useDispatch();
  const onClickMinus = useCallback(() => dispatch(decrease()), [dispatch]);
  const onClickPlus = useCallback(() => dispatch(increase()), [dispatch]);

  return (
    <>
      <div>
        <button onClick={onClickMinus}>-</button>
        <span>{number}</span>
        <button onClick={onClickPlus}>+</button>
      </div>
    </>
  );
};

export default Counter;
