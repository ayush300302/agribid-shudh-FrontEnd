
"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieAnimationProps = {
  className?: string;
};

export default function LottieAnimation({
  className,
}: LottieAnimationProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label="Agriculture animation"
    >
      <DotLottieReact
        src="/animations/MiscAgri%20less%20wait.lottie"
        autoplay
        loop
      />
    </div>
  );
}
