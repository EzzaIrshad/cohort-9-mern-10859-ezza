import { expect } from "chai";
import { describe, it } from "mocha";
import { hashPassword, matchPassword } from "../../src/utils/hash.js";

describe("Password Hash Utilities", () => {
    const password = "testPassword12!3";

    describe("hashPassword", () => {
        it("should return a hashed password", async () => {
            const hashedPassword = await hashPassword(password);

            expect(hashedPassword).to.be.a("string");
            expect(hashedPassword).to.not.equal(password);
        })

        it("should generate different hashes for the same password", async () => {
            const firstHash = await hashPassword(password);
            const secondHash = await hashPassword(password);

            expect(firstHash).to.not.equal(secondHash);
        })
    })

    describe("matchPassword", () => {
        it("should return true when the password matches the hash", async () => {
            const hashedPassword = await hashPassword(password);

            const result = await matchPassword(password, hashedPassword);

            expect(result).to.equal(true);
        })

        it("should return false when the password does not match the hash", async () => {
            const hashedPassword = await hashPassword(password);

            const result = await matchPassword("WrongPassword12", hashedPassword);

            expect(result).to.equal(false);
        })
    })
})