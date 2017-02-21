export const fetchUser = data => {
  return $.ajax({
    method: 'GET',
    url: 'api/profile',
    data: data
  });
};
