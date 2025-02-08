import * as branchService from "../src/api/v1/services/branchService";
import {branches} from "../src/api/v1/services/branchService";

describe("Branch Service", () => {

    describe("createBranch", () => {
        it("should handle successful operation", async () => {
            const testBranch: any = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const result: branchService.Branch = await branchService.createBranch(testBranch);
            expect(branches[0]).toBe(result);
        });
    });

    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const expected: branchService.Branch[] = [{
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            }];

            const result: branchService.Branch[] = await branchService.getAllBranches();
            expect(expected).toStrictEqual(result);
        });
    });

    describe("getBranch", () => {
        it("should handle successful operation", async () => {
            const expected: branchService.Branch = {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const result: branchService.Branch = await branchService.getBranch("1");
            expect(expected).toStrictEqual(result);
        });
    });

    describe("updateBranch", () => {
        it("should handle successful operation", async () => {
            const expected: branchService.Branch = {
                id: "1",
                name: "Sydney Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0023",
            };

            const result: branchService.Branch = await branchService.updateBranch("1", {name: "Sydney Branch", phone: "604-456-0023"});
            expect(expected).toStrictEqual(result);
        });
    });

    describe("deleteBranch", () => {
        it("should handle successful operation", async () => {
            const expected: branchService.Branch[] = [];

            await branchService.deleteBranch("1");
            expect(expected).toStrictEqual(branches);
        });
    });
});