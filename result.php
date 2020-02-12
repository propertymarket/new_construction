<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>new_construction</title>
</head>
<body>
<h1>新築シミュレーション</h1>

<?php
$area = $_POST['area'];
$areaType = $_POST['area_type'];
$cornerArea = $_POST['corner_area'];
$originalLandCoverage = $_POST['land_coverage'];
$originalFloorSpace = $_POST['floor_space'];
$widthOfRoad = $_POST['width_of_road'];
$areaPrice = $_POST['area_price'];

function unit_of_land($x){
    return $x/3.30578;
}
//角地だったら基準建蔽率が１０％緩和
if($cornerArea == 'はい'){
    $validLandCoverage = $originalLandCoverage + 10;
}else{
    $validLandCoverage = $originalLandCoverage;
}
//有効容積率を求める
if($areaType == '近商' || $areaType == '商業' || $areaType == '準工' || $areaType == '工業' || $areaType == '工専'){
    $validFloorSpace = $widthOfRoad * 0.6 * 100;
}else{
    $validFloorSpace = $widthOfRoad * 0.4 * 100;
}
//有効容積率が基準容積率がより大きければ基準容積率を使う
if($validFloorSpace>=$originalFloorSpace){
    $validFloorSpace = $originalFloorSpace;
}

$buildingArea = $_POST['building_area'];
$structure = $_POST['structure'];
$buildingPricePerUnit = $_POST['building_price_per_unit'];
$rentable = $_POST['rentable'];
$perArea = $_POST['per_area'];
//解体費用
if($structure == 'RC'){
    $demolitionCost = unit_of_land($buildingArea) * 10;
}elseif($structure == '木造'){
    $demolitionCost = unit_of_land($buildingArea) * 5;
}else{
    $demolitionCost = unit_of_land($buildingArea) * 7;
}
//延床面積
$totalFloorArea = $area * $validFloorSpace /100;
//賃貸可能面積
$availableRentArea = $totalFloorArea * $rentable /100;

$totalRent = round($availableRentArea /$perArea);
$buildingCost = round($buildingPricePerUnit*unit_of_land($totalFloorArea)+$demolitionCost);

$rentPricePerUnit = $_POST['rent_price_per_unit'];

$fullRent = unit_of_land($availableRentArea) *  $rentPricePerUnit * 12;
?>

<div class='container'>
    <div class='row col-sm-10 offset-sm-1'>
        <table class='table table-bordered'>
            <tr>
                <td rowspan='8'>土地情報</td>
                <td>土地面積</td>
                <td><?php echo $area; ?>㎡</td>
            </tr>
            <tr>
                <td>用途地域</td>
                <td><?php echo $areaType ?></td>
            </tr>
            <tr>
                <td>角地</td>
                <td><?php echo $cornerArea ?></td>
            </tr>
            <tr>
                <td>基準建蔽率</td>
                <td><?php echo $originalLandCoverage ?>％</td>
            </tr>
            <tr>
                <td>基準容積率</td>
                <td><?php echo $originalFloorSpace ?>％</td>
            </tr>
            <tr>
                <td>前面道路幅員</td>
                <td><?php echo $widthOfRoad ?>m</td>
            </tr>
            <tr>
                <td>有効建蔽率</td>
                <td><?php echo $validLandCoverage ?>％</td>
            </tr>
            <tr>
                <td>有効容積率</td>
                <td><?php echo $validFloorSpace ?>％</td>
            </tr>
            <tr>
                <th colspan='2' class='text-center'>土地価格</th>
                <td><?php echo $areaPrice ?>万円</td>
            </tr>
            <tr>
                <th colspan='2' class='text-center'>一種単価</th>
                <td><?php echo round($areaPrice/unit_of_land($area)/$validFloorSpace*100) ?>万円</td>
            </tr>
        
            <tr>
                <td rowspan='8'>建築情報</td>
                <td>既存建物面積</td>
                <td><?php echo round($buildingArea); ?>㎡</td>
            </tr>
            <tr>
                <td>既存建物構造</td>
                <td><?php echo $structure ?></td>
            </tr>
            <tr>
                <td>解体費用</td>
                <td><?php echo round($demolitionCost) ?>万円</td>
            </tr>
            <tr>
                <td>建築坪単価</td>
                <td><?php echo $buildingPricePerUnit ?>万円</td>
            </tr>
            <tr>
                <td>延床面積</td>
                <td><?php echo round($totalFloorArea) ?>㎡</td>
            </tr>
            <tr>
                <td>レンタブル比率</td>
                <td><?php echo $rentable ?>％</td>
            </tr>
            <tr>
                <td>賃貸可能面積</td>
                <td><?php echo round($availableRentArea) ?>㎡</td>
            </tr>
            <tr>
                <td>各戸面積</td>
                <td><?php echo $perArea ?>㎡</td>
            </tr>
            <tr>
                <td colspan='2' class='text-center'>総戸数</td>
                <td><?php echo $totalRent ?></td>
            </tr>
            <tr>
                <th colspan='2' class='text-center'>建築費用</th>
                <td><?php echo $buildingCost ?>万円</td>
            </tr>
            <tr>
                <th colspan='2' class='text-center'>総事業費</th>
                <td><?php echo round($areaPrice + $buildingCost ); ?>万円</td>
            </tr>
            <tr>
                <th rowspan='3' class='text-center'>収支</th>
                <td>賃料坪単価</td>
                <td><?php echo $rentPricePerUnit ?>万円</td>
            </tr>
            <tr>
                <td>満室想定年収</td>
                <td><?php echo round($fullRent) ?>万円</td>
            </tr>
            <tr>
                <td>戸数あたり賃料</td>
                <td><?php echo round($fullRent /12 /$totalRent, 1) ?>万円</td>
            </tr>
            <tr>
                <th colspan='2' class='text-center'>総事業利回り</th>
                <td><?php echo round($fullRent /(round($areaPrice + $buildingCost ))*100, 2) ?>％</td>
            </tr>
        </table>
        
    </div>
</div> 
</body>
</html>