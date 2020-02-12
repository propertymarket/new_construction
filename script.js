'use strict';

{
    //  function showData(pull,push){
    //      const insert = document.getElementById(this.push);
    //      const data = document.getElementById(this.pull).value;
    //     //  return insert. textContent = ${data};
    //     return console.log(data);
    //  };
     

    // document.getElementById('area').addEventListener('blur',{pull:target_area, push:area, handleEvent: showData});
        
    
    document.getElementById('area').addEventListener('blur',() => {
        const target_area = document.getElementById('target_area');
        target_area. textContent = document.getElementById('area').value;
    });
    document.getElementById('area_type').addEventListener('blur',() => {
        const target_area_type = document.getElementById('target_area_type');
        target_area_type. textContent = document.getElementById('area_type').value;
    });
    const corner = document.getElementsByClassName('corner');
        for(let i = 0; i < 2; i++){
            corner[i].addEventListener('click',() => {
                let selected = document.getElementsByName('corner_area');

                if(selected[i].checked){
                    const target_corner_area = document.getElementById('target_corner_area');
                    target_corner_area. textContent = selected[i].value;
                    
                }
        })
    };
        
       
    
    document.getElementById('land_coverage').addEventListener('blur',() => {
        const target_land_coverage = document.getElementById('target_land_coverage');
        target_land_coverage. textContent = document.getElementById('land_coverage').value;
    });
    document.getElementById('floor_space').addEventListener('blur',() => {
        const target_floor_space = document.getElementById('target_floor_space');
        target_floor_space. textContent = document.getElementById('floor_space').value;
    });
    document.getElementById('width_of_road').addEventListener('blur',() => {
        const target_width_of_road = document.getElementById('target_width_of_road');
        target_width_of_road. textContent = document.getElementById('width_of_road').value;
    });
    document.getElementById('area_price').addEventListener('blur',() => {
        const target_area_price = document.getElementById('target_area_price');
        target_area_price. textContent = document.getElementById('area_price').value;
    });
    document.getElementById('building_area').addEventListener('blur',() => {
        const target_building_area = document.getElementById('target_building_area');
        target_building_area. textContent = document.getElementById('building_area').value;
    });
    document.getElementById('structure').addEventListener('blur',() => {
        const target_structure = document.getElementById('target_structure');
        target_structure. textContent = document.getElementById('structure').value;
    });
    document.getElementById('building_price_per_unit').addEventListener('blur',() => {
        const target_building_price_per_unit = document.getElementById('target_building_price_per_unit');
        target_building_price_per_unit. textContent = document.getElementById('building_price_per_unit').value;
    });
    document.getElementById('rentable').addEventListener('blur',() => {
        const target_rentable = document.getElementById('target_rentable');
        target_rentable. textContent = document.getElementById('rentable').value;
    });
    document.getElementById('per_area').addEventListener('blur',() => {
        let target_per_area = document.getElementById('target_per_area');
        target_per_area. textContent = document.getElementById('per_area').value;
    });
    document.getElementById('rent_price_per_unit').addEventListener('blur',() => {
        const target_rent_price_per_unit = document.getElementById('target_rent_price_per_unit');
        target_rent_price_per_unit. textContent = document.getElementById('rent_price_per_unit').value;
    });
    
    document.querySelector('button').addEventListener('click',()=>{
        //角地だったら基準建蔽率が１０％緩和
        const target_corner_area = document.getElementById('target_corner_area').textContent;
        const valid_land_coverage = document.getElementById('valid_land_coverage');
        const target_land_coverage = document.getElementById('target_land_coverage').textContent;
        if(target_corner_area === 'はい'){
            valid_land_coverage. textContent = parseInt(target_land_coverage,10) +10;
        }else{
            valid_land_coverage. textContent = target_land_coverage;
        }

        
        //有効容積率を求める(有効容積率が基準容積率がより大きければ基準容積率を使う)
        const area_type = document.getElementById('target_area_type').textContent;
        const width_of_road = document.getElementById('target_width_of_road').textContent;
        const target_valid_floor_space = document.getElementById('valid_floor_space');
        const target_floor_space = document.getElementById('target_floor_space').textContent;

        if(area_type === '近商' || area_type === '商業' || area_type === '準工' || area_type === '工業' || area_type === '工専'){
            var valid_floor_space = width_of_road * 0.6 * 100;
            // const target_valid_floor_space = document.getElementById('valid_floor_space');
            // target_valid_floor_space.textContent = Math.round(valid_floor_space);
        }else{
            var valid_floor_space = width_of_road * 0.4 * 100;
            // const target_valid_floor_space = document.getElementById('valid_floor_space');
            // target_valid_floor_space.textContent = Math.round(valid_floor_space);
        }
        if(valid_floor_space >= target_floor_space){
            target_valid_floor_space.textContent = Math.round(target_floor_space);
        }else{
            target_valid_floor_space.textContent = Math.round(valid_floor_space);
        }
        
        
        function unit_of_land(x){
            return x/3.30578;
        }

        //一種単価
        const area = document.getElementById('target_area').textContent;
        const target_area_price = document.getElementById('target_area_price').textContent;
        const target_index = document.getElementById('target_index');
        let target_total_area = document.getElementById('target_total_area');
        var valid_floor_space = document.getElementById('valid_floor_space').textContent;

        target_index.textContent = Math.round(target_area_price / unit_of_land(area) / valid_floor_space * 100);
        

        //解体費用
            const target_structure = document.getElementById('target_structure').textContent;
            const target_building_area =document.getElementById('target_building_area').textContent;
            const target_demolition_cost = document.getElementById('target_demolition_cost');
          if(target_structure === 'RC'){
                var demolition_cost = unit_of_land(target_building_area) * 10;
                
              target_demolition_cost.textContent = Math.round(demolition_cost);
         }else if(target_structure === '木造'){
             var demolition_cost = unit_of_land(target_building_area) * 5;
             target_demolition_cost.textContent = Math.round(demolition_cost);
         }else{
             var demolition_cost = unit_of_land(target_building_area) * 7;
             target_demolition_cost.textContent = Math.round(demolition_cost);
        }console.log(unit_of_land(target_building_area));
        
        //延床面積
        //有効容積率が基準容積率がより大きければ基準容積率を使う

        var total_area = area * valid_floor_space/100;console.log(total_area);console.log(valid_floor_space);
        target_total_area.textContent = Math.round(total_area);
        

        //賃貸可能面積
        const rentable = document.getElementById('target_rentable').textContent;
        var available_area = document.getElementById('available_area');
        const available_area_no_round = total_area * rentable / 100;
        available_area.textContent = Math.round(available_area_no_round);

        //総戸数
        var total_rent = document.getElementById('total_rent');
        var available_area = document.getElementById('available_area').textContent;
        const per_area = document.getElementById('target_per_area').textContent;
        const total_rent_no_round = available_area / per_area;
        total_rent.textContent = Math.round(total_rent_no_round);

        //建築費用
        const building_cost = document.getElementById('building_cost');
        const building_price_per_unit = document.getElementById('target_building_price_per_unit').textContent;
        const building_cost_no_round = building_price_per_unit * unit_of_land(total_area) + demolition_cost;console.log(demolition_cost);console.log(unit_of_land(total_area));
        building_cost.textContent = Math.round(building_cost_no_round);

        //総事業費
        const total_cost = document.getElementById('total_cost');
        const total_cost_no_round = parseInt(target_area_price) + building_cost_no_round;
        total_cost.textContent = Math.round(total_cost_no_round);

        //満室想定年収
        const full_rent = document.getElementById('full_rent');
        const full_rent_no_round = unit_of_land(available_area_no_round) * (document.getElementById('target_rent_price_per_unit').textContent) * 12;
        full_rent.textContent = Math.round(full_rent_no_round);

        //戸数あたり賃料
        var total_rent = document.getElementById('total_rent').textContent;
        const rent_per_unit = document.getElementById('rent_per_unit');
        rent_per_unit.textContent = (full_rent_no_round / 12 / total_rent_no_round).toFixed(1);

        //総事業利回り
        const total_cf = document.getElementById('total_cf');
        total_cf.textContent = (full_rent_no_round / total_cost_no_round * 100).toFixed(2);

    });
        
}