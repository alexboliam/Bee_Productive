export const getDate = () => {
  const today = new Date();
  let dd: any = today.getDate();
  let mm: any = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${dd}/${mm}/${yyyy}`;
};

export const getTime = () => {
  const today = new Date();
  let hour: any = today.getHours();
  let minute: any = today.getMinutes();
  let second: any = today.getSeconds();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }

  return `${hour}:${minute}:${second}`;
};

export const gettDateAndTime = () => {
  const today = new Date();
  let day: any = today.getDate();
  let month: any = today.getMonth() + 1;
  const year = today.getFullYear();
  let hour: any = today.getHours();
  let minute: any = today.getMinutes();
  let second: any = today.getSeconds();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }

  return `${day}-${month}-${year}_${hour}:${minute}:${second}`;
};

export const getPriorityArray = () => {
  return ["low", "medium", "high"];
};

export const getFilesIcons = () => {
  return [
    { type: ["word", "docx"], icon: "fa fa-file-word-o" },
    { type: ["powerpoint", "pptx"], icon: "fa fa-file-powerpoint-o" },
    { type: ["pdf"], icon: "fa fa-file-pdf-o" },
    { type: ["code", "ts", "js"], icon: "fa fa-file-code-o" },
    { type: ["excel", "xlsx‬"], icon: "fa fa-file-excel-o" },
    {
      type: ["png", "jpg", "svg", "gif", "jpeg"],
      icon: "fa fa-file-image-o"
    },
    { type: ["video"], icon: "fa fa-file-video-o" },
    { type: ["download"], icon: "fa fa-file-download-o" }
  ];
};

export const getPriorityArray2 = () => {
  return [
    { label: "Task priority", val: "", disabled: true, hidden: false },
    { label: "Low", val: "low", disabled: false, hidden: false },
    { label: "Medium", val: "medium", disabled: false, hidden: false },
    { label: "High", val: "high", disabled: false, hidden: false }
  ];
};
