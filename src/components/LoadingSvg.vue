<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; background: #fff; display: block"
      width="61px"
      height="61px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle cx="60" cy="50" r="4" fill="#7c2cc6">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="95;35"
            keyTimes="0;1"
            begin="-2.5795s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-2.5795s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#7c2cc6">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="95;35"
            keyTimes="0;1"
            begin="-1.2705s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-1.2705s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#7c2cc6">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="95;35"
            keyTimes="0;1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path
          d="M50 50L20 50A30 30 0 0 0 80 50Z"
          fill="#859d7d"
          transform="rotate(90 50 50)"
        ></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#859d7d">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#859d7d">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.25974025974025977s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LoadingSvg",
};
</script>

<style>
</style>