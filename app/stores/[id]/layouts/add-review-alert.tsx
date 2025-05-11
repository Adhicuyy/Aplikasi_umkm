'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { LoaderCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/button"
import { reviewSchema } from "@/schemas"
import { addReview } from "@/actions/review"
import { toast } from "sonner"
import { Review } from "@/app/generated/prisma"

type ReviewFormData = z.infer<typeof reviewSchema>;

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccessAdd: (data: Review & {
    account: {
      ownerName: string;
      image: string | null;
      id: number;
      email: string;
    }
  }) => void;
  token: string;
  storeId: number;
}

function AddReviewAlert({ onOpenChange, open, token, onSuccessAdd, storeId }: IProps) {
  const [loading, startServer] = useTransition();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const rating = watch('rating');

  const onSubmit = (values: ReviewFormData) => {
    startServer(() => {
      addReview(values, token, storeId)
        .then((res) => {
          if (res.success && !!res.data) {
            const { data } = res;
            onSuccessAdd({
              id: data.id,
              account: data.account,
              accountId: data.accountId,
              comment: data.comment,
              createdAt: data.createdAt,
              rating: data.rating,
              storeId: data.storeId
            });
            toast.success(res.message);
            reset();
            onOpenChange(false);
          } else {
            toast.error(res.message);
          }
        });
    })
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Review</AlertDialogTitle>
          <AlertDialogDescription>
            Share your experience with this product.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setValue("rating", star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="focus:outline-none active:scale-110 transition-transform"
                >
                  <Star
                    className={cn(
                      'w-8 h-8 transition-colors',
                      (hoveredStar ?? rating) >= star ? 'text-orange-400' : 'text-gray-300'
                    )}
                    fill={(hoveredStar ?? rating) >= star ? '#f97316' : 'none'}
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              id="comment"
              {...register("comment")}
              rows={3}
              className={`w-full px-3 py-2 border ${errors.comment ? "border-red-500" : "border-gray-300"} rounded`}
            />
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit" className="text-sm gap-2" disabled={loading}>
              {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
              Submit
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddReviewAlert;
