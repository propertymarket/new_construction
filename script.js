'use strict';

{
     function blurEvent(e){
       const insert_info = document.getElementById(this.insert_info);
       insert_info. textContent = document.getElementById(this.info).value;
      };
    
    document.getElementById('area').addEventListener('blur',{info:'area', insert_info:'target_area', handleEvent:blurEvent});
    
    document.getElementById('area_type').addEventListener('blur',{info:'area_type', insert_info:'target_area_type', handleEvent:blurEvent});
      
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
    document.getElementById('land_coverage').addEventListener('blur',{info:'land_coverage', insert_info:'target_land_coverage', handleEvent:blurEvent});
       
    document.getElementById('floor_space').addEventListener('blur',{info:'floor_space', insert_info:'target_floor_space', handleEvent:blurEvent});
       
    document.getElementById('width_of_road').addEventListener('blur',{info:'width_of_road', insert_info:'target_width_of_road', handleEvent:blurEvent});
       
    document.getElementById('area_price').addEventListener('blur',{info:'area_price', insert_info:'target_area_price', handleEvent:blurEvent});
        
    document.getElementById('building_area').addEventListener('blur',{info:'building_area', insert_info:'target_building_area', handleEvent:blurEvent});
       
    document.getElementById('structure').addEventListener('blur',{info:'structure', insert_info:'target_structure', handleEvent:blurEvent});
       
    document.getElementById('building_price_per_unit').addEventListener('blur',{info:'building_price_per_unit', insert_info:'target_building_price_per_unit', handleEvent:blurEvent});
        
    document.getElementById('rentable').addEventListener('blur',{info:'rentable', insert_info:'target_rentable', handleEvent:blurEvent});
        
    document.getElementById('per_area').addEventListener('blur',{info:'per_area', insert_info:'target_per_area', handleEvent:blurEvent});
       
    document.getElementById('rent_price_per_unit').addEventListener('blur',{info:'rent_price_per_unit', insert_info:'target_rent_price_per_unit', handleEvent:blurEvent});
       
    
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
        let valid_floor_space;

        if(area_type === '近商' || area_type === '商業' || area_type === '準工' || area_type === '工業' || area_type === '工専'){
            valid_floor_space = width_of_road * 0.6 * 100
        }else{
            valid_floor_space = width_of_road * 0.4 * 100
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
        valid_floor_space = document.getElementById('valid_floor_space').textContent;

        document.getElementById('target_index').textContent = Math.round(target_area_price / unit_of_land(area) / valid_floor_space * 100);
        

        //解体費用
        const target_structure = document.getElementById('target_structure').textContent;
        const target_building_area =document.getElementById('target_building_area').textContent;
        const target_demolition_cost = document.getElementById('target_demolition_cost');
        let demolition_cost;
        if(target_structure === 'RC'){
                demolition_cost = unit_of_land(target_building_area) * 10;
                target_demolition_cost.textContent = Math.round(demolition_cost);
        }else if(target_structure === '木造'){
                demolition_cost = unit_of_land(target_building_area) * 5;
                target_demolition_cost.textContent = Math.round(demolition_cost);
        }else{
                demolition_cost = unit_of_land(target_building_area) * 7;
                target_demolition_cost.textContent = Math.round(demolition_cost);
        }
        
        //延床面積
        let total_area = area * valid_floor_space/100;
        document.getElementById('target_total_area').textContent = Math.round(total_area);
        

        //賃貸可能面積
        const rentable = document.getElementById('target_rentable').textContent;
        const available_area_no_round = total_area * rentable / 100;
        document.getElementById('available_area').textContent = Math.round(available_area_no_round);

        //総戸数
        const available_area = document.getElementById('available_area').textContent;
        const per_area = document.getElementById('target_per_area').textContent;
        const total_rent_no_round = available_area / per_area;
        document.getElementById('total_rent').textContent = Math.round(total_rent_no_round);

        //建築費用
        const building_price_per_unit = document.getElementById('target_building_price_per_unit').textContent;
        const building_cost_no_round = building_price_per_unit * unit_of_land(total_area) + demolition_cost;
        document.getElementById('building_cost').textContent = Math.round(building_cost_no_round);

        //総事業費
        const total_cost_no_round = parseInt(target_area_price) + building_cost_no_round;
        document.getElementById('total_cost').textContent = Math.round(total_cost_no_round);

        //満室想定年収
        const full_rent_no_round = unit_of_land(available_area_no_round) * (document.getElementById('target_rent_price_per_unit').textContent) * 12;
        document.getElementById('full_rent').textContent = Math.round(full_rent_no_round);

        //戸数あたり賃料
        // var total_rent = document.getElementById('total_rent').textContent;
        document.getElementById('rent_per_unit').textContent = (full_rent_no_round / 12 / total_rent_no_round).toFixed(1);

        //総事業利回り
        document.getElementById('total_cf').textContent = (full_rent_no_round / total_cost_no_round * 100).toFixed(2);

    });
        
}