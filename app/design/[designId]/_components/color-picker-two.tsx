// "use client";

// import { colorToCss } from "@/lib/utils";
// // import { Color } from "@/types/canvas";

// interface ColorPickerProps {
//   onChange: (color: Color) => void;
// }

// export const ColorPicker = ({ onChange }: ColorPickerProps) => {
//   return (
//     <div className="mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2">
//       <ColorButton
//         color={{
//           r: 243,
//           g: 82,
//           b: 35,
//         }}
//         onClick={onChange}
//       />
//     </div>
//   );
// };

// interface ColorButtonProps {
//   onClick: (color: Color) => void;
//   color: Color;
// }

// const ColorButton = ({ onClick, color }: ColorButtonProps) => {
//   return (
//     <button
//       className="hover:opactiy-75 flex h-8 w-8 items-center justify-center transition"
//       onClick={() => onClick(color)}
//     >
//       <div
//         className="h-8 w-8 rounded-md border border-neutral-300"
//         style={{ background: colorToCss(color) }}
//       />
//     </button>
//   );
// };
