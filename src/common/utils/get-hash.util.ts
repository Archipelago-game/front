// note не стал заморачиваться с env, так как данные все таки не критичные
const hash_salt =
  "MyA33OqeCX1D1keYqpcogNwxF3YsYxz1q8MT3ai2SCrL0t3L3pqoWLeJRKJqdEfjurs+U+jtS3jtCGJjfR6+Vw==";

export async function getHash(str: string) {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(hash_salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(str));

  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
