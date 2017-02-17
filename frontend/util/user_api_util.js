export const fetchUser = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/profile'
  });
};
