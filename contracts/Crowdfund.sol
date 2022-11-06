//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Crowdfund is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct Project {
        uint id;
        address owner;
        string name;
        string description;
        address raiseToken;
        uint raisePrice;
    }

    struct Contribution {
        uint id;
        uint projectId;
        uint raiseAmount;
        address contributer;
    }

    struct Release {
        uint id;
        uint projectId;
        uint releaseAmount;
        address releaseAddress;
    }

    uint public projectCount;
    uint public contributionCount;
    uint public releaseCount;

    mapping(uint => Project) private projects;
    mapping(uint => Contribution) private contribution;
    mapping(uint => Release) private releases;
    mapping(uint => uint) private totalRaised;
    mapping(uint => uint) private totalReleased;

    constructor() {}

    function createProject(string memory name, string memory description, address raiseTokenAddress, uint raisePrice) public {
        require(raiseTokenAddress != address(0), "Error: Rase token shouldn't be null");

        projectCount ++;
        projects[projectCount] = Project(projectCount, msg.sender, name, description, raiseTokenAddress, raisePrice);
    }

    function createContribution(uint projectId, uint raiseAmount) public {
        require(projects[projectId].id != 0, "Error: Project does not exist");

        IERC20(projects[projectId].raiseToken).safeTransferFrom(address(msg.sender), address(this), raiseAmount);

        contributionCount ++;
        contribution[contributionCount] = Contribution(contributionCount, projectId, raiseAmount, msg.sender);

        totalRaised[projectId] += raiseAmount;
    }

    function releaseFund(uint projectId, uint releaseAmount, address releaseAddress) public {
        IERC20(projects[projectId].raiseToken).safeTransfer(releaseAddress, releaseAmount);

        releaseCount ++;
        releases[releaseCount] = Release(releaseCount, projectId, releaseAmount, releaseAddress);

        totalReleased[projectId] += releaseAmount;
    }

    function getProject(uint id) public view returns (Project memory) {
        return projects[id];
    }

    function getContribution(uint id) public view returns (Contribution memory) {
        return contribution[id];
    }
    
    function getRelease(uint id) public view returns (Release memory) {
        return releases[id];
    }

    function getRaisedAmount(uint projectId) public view returns (uint) {
        return totalRaised[projectId];
    }

    function getReleasedAmount(uint projectId) public view returns (uint) {
        return totalReleased[projectId];
    }

}
