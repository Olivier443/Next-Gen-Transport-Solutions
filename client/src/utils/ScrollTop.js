const ScrollTop = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };
  goToTop();
  return;
};

export default ScrollTop