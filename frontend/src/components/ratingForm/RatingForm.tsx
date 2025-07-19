import { ChangeEvent, FormEvent, useState } from "react";
import ReviewStars from "../reviewStars/ReviewStars";
import { Button } from "../ui/buttons/Button";
import TextArea from "../ui/inputs/TextArea";
import CheckBox from "../ui/inputs/CheckBox";
export interface FormState {
  comment: string;
  rating: number;
  isHelpful: boolean;
}

const RatingForm = () => {
  const [form, setForm] = useState<FormState>({
    rating: 0,
    comment: "",
    isHelpful: false,
  });
  const handleStarsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, rating: Number(e.target.value) }));

  const handlIsHelpful = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, isHelpful: e.target.checked }));

  const handleCommentChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log(form);
    } catch (err) {
      console.error(" Submit failed:", err);
    }
  };

  return (
    <section className="sm:scale-[1] flex-1 flex flex-col justify-center items-center sm:px-[5.71875rem] sm:py-[3.8rem] px-6 py-6 overflow-hidden">
      <h3 className="font-bold text-[1.875rem] text-primary-text ">
        Enter your rating {""}
      </h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="text-center space-x-3">
          <ReviewStars
            name="rating"
            value={form.rating}
            onChange={() => handleStarsChange}
          />
        </div>
        <TextArea
          name="comment"
          title="Comment"
          placeholder="enter your comment"
          value={form.comment}
          onChange={handleCommentChange}
        />
        <CheckBox
          checked={form.isHelpful}
          onChange={handlIsHelpful}
          title="is helpful"
        />
        <div className="flex gap-4">
          <Button type="submit" children={"submit rate"}></Button>
          <Button
            className="w-[22rem]"
            onClick={() =>
              setForm({ rating: 0, comment: "", isHelpful: false })
            }
            children={"cancel"}
          />
        </div>
      </form>
    </section>
  );
};

export default RatingForm;
