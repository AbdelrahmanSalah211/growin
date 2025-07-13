export const  formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-Us", {
      year: "numeric",
      month: "numeric",
    });
  };