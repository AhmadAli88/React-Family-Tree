/*eslint-disable*/
import { useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const SearchableFamilyTree = () => {
  const divRef = useRef(null);

  const data = [
    { 
      id: 1, 
      pids: [2], 
      name: "John Smith", 
      gender: "male",
      generation: "1",
      branch: "main"
    },
    // ... more family members
  ];

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: data,
      nodeBinding: {
        field_0: "name",
        field_1: "gender",
        field_2: "generation"
      },
      searchFields: ["name", "gender", "generation", "branch"],
      enableSearch: true,
      nodeMenu: {
        filter: { text: "Filter" }
      }
    });

    // Custom search
    const searchBox = document.createElement('input');
    searchBox.style.padding = '5px';
    searchBox.style.margin = '15px';
    searchBox.placeholder = 'Search family members...';
    
    searchBox.addEventListener('input', (e) => {
      family.search(e.target.value);
    });

    divRef.current.parentNode.insertBefore(searchBox, divRef.current);

    // Filter functions
    const filterByGeneration = (generation) => {
      family.filterUI.addFilterCondition({
        column: 'generation',
        value: generation,
        method: 'equal'
      });
    };

    const filterByBranch = (branch) => {
      family.filterUI.addFilterCondition({
        column: 'branch',
        value: branch,
        method: 'equal'
      });
    };

  }, []);

  return <div id="tree" ref={divRef} style={{ height: '100vh' }}></div>;
};

export default SearchableFamilyTree;