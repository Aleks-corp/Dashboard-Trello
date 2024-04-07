import { CSSObjectWithLabel } from "react-select";

export const customSelectStyles = {
  placeholder: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: "#555555",
    fontWeight: "500",
  }),
  container: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    border: "none",
    width: "100%",
    fontFamily: "Raleway",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.56",
  }),
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    paddingLeft: "8px",
    backgroundColor: "#adadad",
    border: "none;",
    borderRadius: "5px",
    height: "30px",
    transition: "background-color 0.4s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#a5a5a5",
    },
  }),
  menu: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,

    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#a5a5a5",
    animation: "fade--in 0.4s ease-in-out",
    "@keyframes fade--in": {
      "0%": {
        opacity: "0",
      },
      "100%": {
        opacity: "1",
      },
    },
  }),
  menuList: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,

    backgroundColor: "#a5a5a5",
    border: "none;",
    color: "white",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#434d67",
      borderRadius: "5px",
    },
  }),
  selectContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,

    backgroundColor: "#a5a5a5",
    border: "none;",
    borderRadius: "20px",
  }),
  option: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,

    backgroundColor: "#a5a5a5",
    color: "#212121",
    cursor: "pointer",
    padding: "0 10px 5px",
  }),
  valueContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: "0",
  }),
  // Input: (baseStyles: CSSObjectWithLabel) => ({
  //   ...baseStyles,
  //   color: "white",
  //   fontSize: "40px",
  // }),
  singleValue: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: "#212121",
  }),
  indicatorSeparator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    display: "none",
  }),
  dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: "#F3F3F3",
    paddingRight: "12px",
    transform: "scaleY(1)",
    "&:active": {
      color: "#808080",
      transform: "scaleY(-1)",
      transition: "transform 0.3s ease",
    },
  }),
};
