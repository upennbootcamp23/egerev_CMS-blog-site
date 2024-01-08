module.exports = 
{
    format_date: date => 
    {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date).getFullYear()}`;
    },

    eq: (param1, param2) =>
    {
      return param1 === param2;
    }
};