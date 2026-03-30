<template>
  <div class="letter">
    <h1>My Dearest,</h1>
    <p></p>
    <p></p>
    <p></p>
    <p>
      With all my love,
      <br />
      [Your Name]
    </p>
  </div>
</template>
<style scoped>
.letter {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  font-family: 'Georgia', serif;
  color: #333;
  @media screen and (max-width: 768px) {
    margin: 20px;
    padding: 20px;
  }
}
.letter h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #e91e63;
}
.letter p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
}
.letter p:last-child {
  margin-bottom: 0;
}
</style>
