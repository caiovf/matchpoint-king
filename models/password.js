import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepper = process.env.PEPPER_PASSWORD;

  const pepperedPassword = `${password}${pepper}`;
  return await bcryptjs.hash(pepperedPassword, rounds);
}

function getNumberOfRounds() {
  let rounds = 1;

  if (process.env.NODE_ENV === "production") {
    rounds = 14;
  }

  return rounds;
}

async function compare(providedPassword, storedPassword) {
  const pepper = process.env.PEPPER_PASSWORD;

  const pepperedPassword = `${providedPassword}${pepper}`;
  return await bcryptjs.compare(pepperedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
