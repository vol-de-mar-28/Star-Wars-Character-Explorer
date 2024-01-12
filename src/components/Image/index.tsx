import React from 'react';
import male from '../../images/male.png';
import female from '../../images/female.png';
import robot from '../../images/robot.png';

interface Props {
  gender: string;
  name: string;
}

const charactersImages: any = {
  'male': male,
  'female': female,
  'n/a': robot
}

const Image: React.FC<Props> = ({ gender, name }: Props) => {

  return <img src={charactersImages[gender]} alt={name}/>

}

export default Image;