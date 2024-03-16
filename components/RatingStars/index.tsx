import ReactStars, { IRatingStarProps } from 'react-rating-star-with-type';

export default function RatingStars(props: IRatingStarProps) {
  const { isEdit, onChange, value } = props;
  return (
    <ReactStars value={value} isEdit={isEdit} onChange={onChange} size={24} />
  );
}
