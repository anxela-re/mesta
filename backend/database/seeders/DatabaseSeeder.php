<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\Composition;
use App\Models\Phase;
use App\Models\Profile;
use App\Models\Property;
use App\Models\Recipe;
use App\Models\User;
use Carbon\Carbon;
use Database\Factories\PropertyFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RecursiveArrayIterator;
use RecursiveIteratorIterator;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@mesta.com',
            'password' => bcrypt('admin')
        ]);

        // profiles
        $profiles = ['Cabello', 'Facial'];
        $phase_1 = [
            'name' => 'Tensioactivos',
            'color' => '#BA68C8'
        ];
        $phase_2 = [
            'name' => 'Hidrolatos',
            'color' => '#64B5F6'
        ];
        $phase_3 = [
            'name' => 'Aceites vegetales',
            'color' => '#81C784'
        ];
        $phase_4 = [
            'name' => 'Activos',
            'color' => '#ffb74d'
        ];
        $phase_5 = [
            'name' => 'Aceites esenciales',
            'color' => '#FF8A65'
        ];
        $phase_6 = [
            'name' => 'Conservantes',
            'color' => '#4DB6AC'
        ];
        $properties_profile1 = ['Cabello seco', 'Cabello graso', 'Cabello teñido', 'Psoriasis', 'Anticaspa', 'Anticaída', 'Hidratante', 'Nutritivo', 'Cabello rizo', 'Antiencrespamiento', 'Canas', 'Puntas abiertas', 'Acondicionador', 'Limpiador', 'Regenerante'];
        $properties_profile2 = ['Limpiador', 'Regenerante', 'Antioxidante', 'Nutritiva', 'Antiedad', 'Antimanchas'];


        $profile_1 = Profile::create([
            'name' => $profiles[0],
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum suscipit tortor, non laoreet neque condimentum eu. Maecenas at sodales purus. Sed vel varius risus, sed ultrices felis. Duis finibus varius fermentum. In congue odio non sem laoreet, sed auctor lorem porttitor. Suspendisse venenatis ante leo, id eleifend elit lacinia id. Morbi eleifend, enim gravida facilisis interdum, mauris dolor consequat eros, aliquet lobortis orci libero ut lectus. Nunc eu cursus mi, et tristique metus. Vestibulum ante lacus, iaculis id elit non, placerat maximus dui. Etiam eget leo nibh.',
            'user_id' => $admin->id,
        ]);
        $profile_2 = Profile::create([
            'name' => $profiles[1],
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum suscipit tortor, non laoreet neque condimentum eu. Maecenas at sodales purus. Sed vel varius risus, sed ultrices felis. Duis finibus varius fermentum. In congue odio non sem laoreet, sed auctor lorem porttitor. Suspendisse venenatis ante leo, id eleifend elit lacinia id. Morbi eleifend, enim gravida facilisis interdum, mauris dolor consequat eros, aliquet lobortis orci libero ut lectus. Nunc eu cursus mi, et tristique metus. Vestibulum ante lacus, iaculis id elit non, placerat maximus dui. Etiam eget leo nibh.',
            'user_id' => $admin->id,
        ]);

        $phase_1_profile_1 = Phase::create([
            'name' => $phase_1['name'],
            'color' => $phase_1['color'],
            'profile_id' => $profile_1->id
        ]);

        $phase_2_profile_1 = Phase::create([
            'name' => $phase_2['name'],
            'color' => $phase_2['color'],
            'profile_id' => $profile_1->id
        ]);

        $phase_3_profile_1 = Phase::create([
            'name' => $phase_3['name'],
            'color' => $phase_3['color'],
            'profile_id' => $profile_1->id
        ]);

        $phase_4_profile_1 = Phase::create([
            'name' => $phase_4['name'],
            'color' => $phase_4['color'],
            'profile_id' => $profile_1->id
        ]);

        $phase_5_profile_1 = Phase::create([
            'name' => $phase_5['name'],
            'color' => $phase_5['color'],
            'profile_id' => $profile_1->id
        ]);

        $phase_1_profile_2 = Phase::create([
            'name' => $phase_2['name'],
            'color' => $phase_2['color'],
            'profile_id' => $profile_2->id
        ]);

        $phase_2_profile_2 = Phase::create([
            'name' => $phase_4['name'],
            'color' => $phase_4['color'],
            'profile_id' => $profile_2->id
        ]);

        $phase_3_profile_2 = Phase::create([
            'name' => $phase_5['name'],
            'color' => $phase_5['color'],
            'profile_id' => $profile_2->id
        ]);

        $phase_4_profile_2 = Phase::create([
            'name' => $phase_6['name'],
            'color' => $phase_6['color'],
            'profile_id' => $profile_2->id
        ]);

        $properties_profile_1 = array();
        $properties_profile_2 = array();

        foreach ($properties_profile1 as $property) {
            $prop = Property::create([
                'name' => $property,
                'profile_id' => $profile_1->id
            ]);
            array_push($properties_profile_1, $prop);
        }
        foreach ($properties_profile2 as $property) {
            $prop = Property::create([
                'name' => $property,
                'profile_id' => $profile_2->id
            ]);
            array_push($properties_profile_2, $prop);
        }

        $component_1_phase_1_profile_1 = Component::create([
            'name' => 'SCI',
            'scientific_name' => 'Sodium Cocoyl Isehionate',
            'description' => 'Tensioactivo ultrasuave indicado para hacer champú sólido, jabón líquido, espuma de afeitar, gel de baño, productos para bebés y otros productos de baño.. aportando una espuma rica y cremosa. Soluble en agua a 70ºC. Diluir en agua caliente y mezclar. No exponer a luz solar. Mantener en lugar fresco y fuera del alcance de los niños.',
            'phase_id' => $phase_1_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_1_profile_1 = Component::create([
            'name' => 'SCS',
            'scientific_name' => 'Sodium Coco Sulfate',
            'description' => 'Tensioactivo aniónico derivado del aceite de coco. Indicado para formular productos de baño, jabones, geles, champú líquido y en barra. Soluble en agua a 20ºC. Diluir en agua caliente y mezclar.',
            'phase_id' => $phase_1_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_1_profile_1 = Component::create([
            'name' => 'Coco glucoside',
            'scientific_name' => 'Coco glucoside',
            'description' => 'Tensioactivo no-iónico de origen vegetal que se extrae del aceite de coco y del azúcar de algunas frutas. Es un tensioactivo suave que facilita el peinado y suaviza el cabello. Coco glucoside es compatible con otros tensioactivos y no reseca la piel. Produce una espuma abundante siendo indicado para puedes atópicas, delicadas o sensibles, para bebés o mascotas. Coco glucoside es biodegradable y se utiliza para la elaboración de gel de ducha, baño y champú, mascarillas limpiadoras y limpiadores faciales.',
            'phase_id' => $phase_1_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_2_profile_1 = Component::create([
            'name' => 'Hidrolato de Hamamelis',
            'scientific_name' => 'Hamamelis Virginiana Water',
            'description' => 'El hidrolato de hamamelis puede emplearse directamente como tónico o bien como añadido a cremas, perfume, jabones, lociones, champú... enriqueciendo la fórmula con sus propedades astringentes. El hidrolato de hamamelis se recomienda para pieles mixtas y grasas. Un buen tónico facial suavizante y calmante. Como producto capilar es ideal para cabellos grasos.',
            'phase_id' => $phase_2_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_1_profile_2 = Component::create([
            'name' => 'Hidrolato de Hamamelis',
            'scientific_name' => 'Hamamelis Virginiana Water',
            'description' => 'El hidrolato de hamamelis puede emplearse directamente como tónico o bien como añadido a cremas, perfume, jabones, lociones, champú... enriqueciendo la fórmula con sus propedades astringentes. El hidrolato de hamamelis se recomienda para pieles mixtas y grasas. Un buen tónico facial suavizante y calmante. Como producto capilar es ideal para cabellos grasos.',
            'phase_id' => $phase_1_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_2_profile_1 = Component::create([
            'name' => 'Hidrolato de ciprés',
            'scientific_name' => 'Cupressus Sempervirens Water',
            'description' => 'El hidrolato de criprés puede emplearse directamente como tónico o bien añadido al chamoú, cremas, mascarillas y lociones para piel mixta y grasa... enriqueciendo la fórmula con sus propiedades astringentes, descongestionantes y estimulantes. Regula el exceso de grasa en la piel y estimola la microcirculación. Alivia la circulación sanguínea, cuperosis, acné, celulitis... Muy efectivo en poros dilatados y dermatitis atópica. Aplicado directo al cabello o en productos capilares, el ciprés calma el cuero cabelludo irritado y previene la caspa.',
            'phase_id' => $phase_2_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_1_profile_2 = Component::create([
            'name' => 'Hidrolato de ciprés',
            'scientific_name' => 'Cupressus Sempervirens Water',
            'description' => 'El hidrolato de criprés puede emplearse directamente como tónico o bien añadido al chamoú, cremas, mascarillas y lociones para piel mixta y grasa... enriqueciendo la fórmula con sus propiedades astringentes, descongestionantes y estimulantes. Regula el exceso de grasa en la piel y estimola la microcirculación. Alivia la circulación sanguínea, cuperosis, acné, celulitis... Muy efectivo en poros dilatados y dermatitis atópica. Aplicado directo al cabello o en productos capilares, el ciprés calma el cuero cabelludo irritado y previene la caspa.',
            'phase_id' => $phase_1_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_2_profile_1 = Component::create([
            'name' => 'Hidrolato de salvia',
            'scientific_name' => 'Salvia Officinalis Water',
            'description' => 'El hidrolato de salvia puede emplerse directamente como tónico o bien añadido al champú, cremas, mascarillas y lociones para piel mixta y grasa... enriqueciendo la fórmula con sus propiedades astringentes, antisépticas y sebo-reguladoras. El hidrolato de salvia controla el exceso de grasa, tonifica y matifica la piel. Indicada en tratamientos de acné, cambios hormonales... De efecto desodorante, es muy efectiva regulando la transpiración y controlando la actividad de las glándulas sebáceas. Aplicado directamente al cabello o en productos capilares, la salvia estimula la raíz del calbello, fortalencienco y evitando su caída excesiva, por lo que resulta muy común en champú (también para el control de gras y caspa), mascarillas y lociones capilares.',
            'phase_id' => $phase_2_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_1_profile_2 = Component::create([
            'name' => 'Hidrolato de salvia',
            'scientific_name' => 'Salvia Officinalis Water',
            'description' => 'El hidrolato de salvia puede emplerse directamente como tónico o bien añadido al champú, cremas, mascarillas y lociones para piel mixta y grasa... enriqueciendo la fórmula con sus propiedades astringentes, antisépticas y sebo-reguladoras. El hidrolato de salvia controla el exceso de grasa, tonifica y matifica la piel. Indicada en tratamientos de acné, cambios hormonales... De efecto desodorante, es muy efectiva regulando la transpiración y controlando la actividad de las glándulas sebáceas. Aplicado directamente al cabello o en productos capilares, la salvia estimula la raíz del calbello, fortalencienco y evitando su caída excesiva, por lo que resulta muy común en champú (también para el control de gras y caspa), mascarillas y lociones capilares.',
            'phase_id' => $phase_1_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_2_profile_1 = Component::create([
            'name' => 'Hidrolato de manzanilla',
            'scientific_name' => 'Anthemis Nobilis Water',
            'description' => 'El hidrolato de manzanilla puede emplearse directamente como tónico o bien como añadido a cremas perfume, jabones, lociones, champú... enriqueciendo la fórmula con sus propiedades calmantes. El hidrolato de manzanilla se recomienda para todo tipo de pieles, especialmente secas y sensibles, calmando y suavizando la piel. Un excelente tónico facial suave, para ojos ocn bolsas y ojeras, desinflama y atenúa. Como producto capilar es ideal para fortalecer el cabello y aportar suavidad. Emplear en cabellos rubios.',
            'phase_id' => $phase_2_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_1_profile_2 = Component::create([
            'name' => 'Hidrolato de manzanilla',
            'scientific_name' => 'Anthemis Nobilis Water',
            'description' => 'El hidrolato de manzanilla puede emplearse directamente como tónico o bien como añadido a cremas perfume, jabones, lociones, champú... enriqueciendo la fórmula con sus propiedades calmantes. El hidrolato de manzanilla se recomienda para todo tipo de pieles, especialmente secas y sensibles, calmando y suavizando la piel. Un excelente tónico facial suave, para ojos ocn bolsas y ojeras, desinflama y atenúa. Como producto capilar es ideal para fortalecer el cabello y aportar suavidad. Emplear en cabellos rubios.',
            'phase_id' => $phase_1_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_3_profile_1 = Component::create([
            'name' => 'Jojoba',
            'scientific_name' => 'Simmondsia Chinensis Oil',
            'description' => 'El aceite de jojoba en el realidad una cera líquida, que se extrae de las semillas de las planta que crece en los desiertos de América del Sur. Se trata de una textura ligera, de penetración profunda y nutritiva para la piel y el cabello. Contiene vitaminas A, E, B1, B2, B6 y un 96% de ceramidas. Quimicamente muysimilar al sebo humano, contiene excelentes propiedades hidratantes y emolientes que se adaptan a todo tipo de piel, incluso piel seca, madura o adolescente, equilibrando las pieles grasas. Como acondicionador de cabello es muy eficaz, ayuda a nutrir, fortaleces y proteger adecuadamente.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_3_profile_1 = Component::create([
            'name' => 'Ricino',
            'scientific_name' => 'Ricinus Communis Oil',
            'description' => 'El aceite de ricino es uno de los pocos aceites que se pueden emplear como unu agente emulsionante. Muy rico en ácido ricinoleico, un ácido graso con potentes propiedades emolientes y antimicrobiandas. Puede ser beneficioso para problemas de piel seca e infecciones como eczema, erupciones y acné. Usado desde hace miles de años, los antiguos egipcios ya creían que éste aceite mejoraba la condición de su piel y cabello, Hoy en día el aceite de ricino se emplea comúnmente como ingredientes en muchos productos cosméticos.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_3_profile_1 = Component::create([
            'name' => 'Coco',
            'scientific_name' => 'Cocos Nucifera Oil',
            'description' => 'El aceite de coco es blanco, sólido y se derrite al contacto con la piel, aunque en verano suele presentarse líquido. Es un ingrediente esencial en la fabricación de jabón líquido, lo que permite claridad y solubilidad. En ambos jabones, de sodio y potasio produce una espuma rica. El aceite de coco hace un buen jabón para el cuidado de la piel, aunque es conveniente mezclar con aceites blandos, como aceite de oliva o de almendras, ya que por si solo reserca en exceso la piel.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_3_profile_1 = Component::create([
            'name' => 'Almendras dulces',
            'scientific_name' => 'Prunus Amygdalus Dulcis Oil',
            'description' => 'El aceite de almendras dulces es un aceite noble de color amarillo y sabor dulce, con grandes propiedades emolientes sobre la piel y buena tolerabilidad. Excelente como aceite portador para administrar aceites esenciales en ancianos y niños. La fraccion insaponificable de la almendra dulce, escualano, tocoferol y fitoesteroles, garantizan a la piel el aporte de sustancias altamente nutritivas. Recomendado para hacer productos cosméticos con actividad hidratante y emoliente. Suave, no irritante, se extiende y absorve fácilmente dejando la piel sedosa y flexible.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_5_phase_3_profile_1 = Component::create([
            'name' => 'Manteca de karité',
            'scientific_name' => 'Butyrospermum Parkii Butter',
            'description' => 'La manteca de karité se extrae de la nuez del karité. Se utiliza principalmente para el cuidado de la piel, conocido por sus propiedades altamente hidratantes y emolientes. Rica en vitaminas y ácidos grasos, penetra profundamente en la epidermis y deja un acabado suave y satinado. La manteca de karité se puede utilizar para hacer barras de masaje, cremas corporales, bálsamos labiales y como ingrediente humectante en jabones caseros y cremas de afeitar.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_6_phase_3_profile_1 = Component::create([
            'name' => 'Nuez de macadamia',
            'scientific_name' => 'Macadamia Ternifolia Seed Oil',
            'description' => 'El aceite de macadamia se obtiene de la presión en frío de la grasa de la nuez del árbol, originario de Australia. Es rico en ácido palmítico, lo cual es inusual en aceites suaves. El ácido palmítico está presente en la piel humana ayudando a mantener el nivel natural de humedad, un aporte que se va reduciendo con la edad, por lo que el aceite de nuez de macadamia es una buena opción para tratamientos de piel seca o antiedad. De fácil absorción, mantiene la humedad en la piel durante horas. Excelente para hacer cremas, lociones, aceiters y barritas de masaje, aceites de baño, productos capilares y productos solares.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_7_phase_3_profile_1 = Component::create([
            'name' => 'Neem',
            'scientific_name' => 'Azadirachta Indica Oil',
            'description' => 'El aceite de neerm se obtiene de las semillas del árbol de Neem, que se encuentra principalemnte en la India. Tiene un alto contenido en ácido oleico, palmítico, esteárico y linoleico. Empleado durante siglos para tratar afecciones de la piel como eczema, psoriasis, úlceras, varicela, quemaduras, caspa y como repelente de piojos. Añadido a la pasta dentral ayuda a sanar dolencias orales como la inflamación de encías o sangrado. Agregado a productos para los pies ayuda a curar hongos y bacterias. Este aceite posee un aroma particular y fácil de enmascarar. El aceite esencias de cedro (por ejemplo) sería un buen complemento para fabricar un champú anticaspa, tanto por sus propiedades como por su aroma agradable y amaderado.',
            'phase_id' => $phase_3_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_4_profile_1 = Component::create([
            'name' => 'Proteína de seda',
            'scientific_name' => 'Hydrolyzed Silk Protein',
            'description' => 'Por su capacidad para retener el agua, la proteína de seda es un activo excelente para acondicionar y reparar la piel y el cabello, manteniéndolos suaves, hidratados y nutridos.Se recomienda para piel seca, áspera, deshidratada ó madura y tratamientos capilares para cabellos secos, castigados, dañados ó puntas abiertas. Podemos encontrar proteínas de seda en gran cantidad de productos de belleza e higiene corporal: cremas faciales y corporales, lociones y tónicos, champú y mascarillas capilares, jabones y gel de ducha.',
            'phase_id' => $phase_4_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_2_profile_2 = Component::create([
            'name' => 'Proteína de seda',
            'scientific_name' => 'Hydrolyzed Silk Protein',
            'description' => 'Por su capacidad para retener el agua, la proteína de seda es un activo excelente para acondicionar y reparar la piel y el cabello, manteniéndolos suaves, hidratados y nutridos.Se recomienda para piel seca, áspera, deshidratada ó madura y tratamientos capilares para cabellos secos, castigados, dañados ó puntas abiertas. Podemos encontrar proteínas de seda en gran cantidad de productos de belleza e higiene corporal: cremas faciales y corporales, lociones y tónicos, champú y mascarillas capilares, jabones y gel de ducha.',
            'phase_id' => $phase_2_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_4_profile_1 = Component::create([
            'name' => 'Arcilla blanca',
            'scientific_name' => 'Kaolin',
            'description' => 'La arcilla blanca es ideal para hacer mascarillas de limpieza suave y profunda. Puede ser mezclada con agua pura, aunque siempre recomendamos su uso mezclada con aloe vera gel, aceites base, aceites esenciales o hidrolatos, los beneficios terapéuticos se multiplican a la vez que aportamos otros nutrientes.',
            'phase_id' => $phase_4_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_2_profile_2 = Component::create([
            'name' => 'Arcilla blanca',
            'scientific_name' => 'Kaolin',
            'description' => 'La arcilla blanca es ideal para hacer mascarillas de limpieza suave y profunda. Puede ser mezclada con agua pura, aunque siempre recomendamos su uso mezclada con aloe vera gel, aceites base, aceites esenciales o hidrolatos, los beneficios terapéuticos se multiplican a la vez que aportamos otros nutrientes.',
            'phase_id' => $phase_2_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_4_profile_1 = Component::create([
            'name' => 'Arcilla verde',
            'scientific_name' => 'Montmorillonite',
            'description' => 'La arcilla verde es ideal para hacer mascarillas de limpieza profunda. Puede ser mezclada con agua pura, aunque siempre recomendamos su uso mezclado con alo vera gel, aceites base, aceites esenciales o hidrolatos, los beneficios terapéuticos se multiplican a la vez que aportamos otros nutrientes. De textura final y ligera, la arcilla verde elimina toxinas y regula la grasa restaurando la piel, revitalizando el cutis y cerrando los poros.',
            'phase_id' => $phase_4_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_2_profile_2 = Component::create([
            'name' => 'Arcilla verde',
            'scientific_name' => 'Montmorillonite',
            'description' => 'La arcilla verde es ideal para hacer mascarillas de limpieza profunda. Puede ser mezclada con agua pura, aunque siempre recomendamos su uso mezclado con alo vera gel, aceites base, aceites esenciales o hidrolatos, los beneficios terapéuticos se multiplican a la vez que aportamos otros nutrientes. De textura final y ligera, la arcilla verde elimina toxinas y regula la grasa restaurando la piel, revitalizando el cutis y cerrando los poros.',
            'phase_id' => $phase_2_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_4_profile_1 = Component::create([
            'name' => 'Arcilla roja',
            'scientific_name' => 'Red Clay',
            'description' => 'Al igual que las otras arcillas, la arcilla roja está indicada para desintoxicar y purificar la piel. Con propiedades un tanto más suaves, es ideal para pieles sensibles, irritadas o con dermatitis.',
            'phase_id' => $phase_4_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_2_profile_2 = Component::create([
            'name' => 'Arcilla roja',
            'scientific_name' => 'Red Clay',
            'description' => 'Al igual que las otras arcillas, la arcilla roja está indicada para desintoxicar y purificar la piel. Con propiedades un tanto más suaves, es ideal para pieles sensibles, irritadas o con dermatitis.',
            'phase_id' => $phase_2_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_5_phase_4_profile_1 = Component::create([
            'name' => 'Arcilla azul',
            'scientific_name' => 'Bleu Kaolin',
            'description' => 'La arcilla azul es de textura ultrafina. Muy rica en silice y baja en sales minerales. Menos absorvente que la arcilla verde, limpia, nutre y revitaliza la piel seca, apagada, sensible o delicada. El resultado es una piel limpia, de tono uniforme y aspecto radiante.',
            'phase_id' => $phase_4_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_5_phase_2_profile_2 = Component::create([
            'name' => 'Arcilla azul',
            'scientific_name' => 'Bleu Kaolin',
            'description' => 'La arcilla azul es de textura ultrafina. Muy rica en silice y baja en sales minerales. Menos absorvente que la arcilla verde, limpia, nutre y revitaliza la piel seca, apagada, sensible o delicada. El resultado es una piel limpia, de tono uniforme y aspecto radiante.',
            'phase_id' => $phase_2_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_5_profile_1 = Component::create([
            'name' => 'Lavanda',
            'scientific_name' => 'Lavandula Angustifolia Oil',
            'description' => 'El aceite esencial de lavanda de Bulgaria tiene notas olfativas ligeramente diferentes al aceite esencial de lavanda francesa. Un aroma con más cuerpo aunque en el mismo rango de propiedades terapéuticas. El aceite esencial de lavanda es conocida por su efecto beneficioso sobre el sistema inmune, sus propiedades analgésicas, antisépticas y sanadoras. Muy versátil en aromaterapia y uno de los pocos aceites esenciales que se pueden aplicar directamente sobre la piel. Un aceite muy preciado por su maravillosa fragancia, empleado en perfumes y productos cosméticos.',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_3_profile_2 = Component::create([
            'name' => 'Lavanda',
            'scientific_name' => 'Lavandula Angustifolia Oil',
            'description' => 'El aceite esencial de lavanda de Bulgaria tiene notas olfativas ligeramente diferentes al aceite esencial de lavanda francesa. Un aroma con más cuerpo aunque en el mismo rango de propiedades terapéuticas. El aceite esencial de lavanda es conocida por su efecto beneficioso sobre el sistema inmune, sus propiedades analgésicas, antisépticas y sanadoras. Muy versátil en aromaterapia y uno de los pocos aceites esenciales que se pueden aplicar directamente sobre la piel. Un aceite muy preciado por su maravillosa fragancia, empleado en perfumes y productos cosméticos.',
            'phase_id' => $phase_3_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_5_profile_1 = Component::create([
            'name' => 'Bergamota',
            'scientific_name' => 'Citrus Bergamia Oil ',
            'description' => 'La bergamota es ampliamente utilizado en la aromaterapia para ayudar a aliviar el estrés relacionado con el trabajo, la depresión, la tensión y la agitación física y mental para la calma. Es un aceite muy común en la formulación de perfumes, aporta una calidad terapéutica maravillosa y su fragancia a cualquier masaje o baño reparador. El aceite esencia de bergamota se produce a partir del fruto de un pequeño árbol.',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_2_phase_3_profile_2 = Component::create([
            'name' => 'Bergamota',
            'scientific_name' => 'Citrus Bergamia Oil ',
            'description' => 'La bergamota es ampliamente utilizado en la aromaterapia para ayudar a aliviar el estrés relacionado con el trabajo, la depresión, la tensión y la agitación física y mental para la calma. Es un aceite muy común en la formulación de perfumes, aporta una calidad terapéutica maravillosa y su fragancia a cualquier masaje o baño reparador. El aceite esencia de bergamota se produce a partir del fruto de un pequeño árbol.',
            'phase_id' => $phase_3_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_5_profile_1 = Component::create([
            'name' => 'Petitgrain',
            'scientific_name' => 'Citrus Aurantium var. Amara Oil',
            'description' => 'El aceite esencial de petitgrain se produce a partir del naranjo amargo, del que además se producen otros aceites esenciales con distintas partes del árbol, como el neroli (flores), naranja amarga (piel del fruto), petitgrain (hojas y ramas)...',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_3_phase_3_profile_2 = Component::create([
            'name' => 'Petitgrain',
            'scientific_name' => 'Citrus Aurantium var. Amara Oil',
            'description' => 'El aceite esencial de petitgrain se produce a partir del naranjo amargo, del que además se producen otros aceites esenciales con distintas partes del árbol, como el neroli (flores), naranja amarga (piel del fruto), petitgrain (hojas y ramas)...',
            'phase_id' => $phase_3_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_4_phase_5_profile_1 = Component::create([
            'name' => 'Laurel',
            'scientific_name' => 'Laurus Nobilis Oil',
            'description' => 'El aceite esencial de laurel procede de su árbol laurel, de hoja perenne de la familia de las lauráceas. De corteza gris, alcanza de 7,5 hasta 9 metros con hojas gruesas y brillantes- Originaria de la zona Mediterránea, produce flores amarillas y ricos frutos negros, de los cuales se extrae el aceite (base) de laurel mediante presión en frío. Según la mitología, el laurel es la transformación de la ninfa Daphne, que perseguida por Apolo, fue salvada por su padre el río Peneo transformándola en Laurel. Apolo cortó dos ramas y las trenzó elaborando una corona triunfal, que más tarde usarían los victoriosos y emperadores de la antigua Roma, como símbolo de victorio y sabiduría.',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_5_phase_5_profile_1 = Component::create([
            'name' => 'Árbol de té',
            'scientific_name' => 'Melaleuca Alternifolia Oil',
            'description' => 'Melaleuca alternifolia, flores amarillas, plumas y hojas verdes brillantes cubren las ramas de estos árboles pequeños, que en la madurez no suelen superar los seis metros de altura. De las 300 variedades de árbol de té, la variedad Melaleuca alternifolia produce el aceite esencial terapéutico que se utiliza más comúnmente en aromaterapia. El nombre del "árbol de té" se deriva de los aborigenes australianos, que usaban sus hojas para hacer té de hierbas. En la moderna aromaterapia el aceite esencial de árbol de té es uno de los aceites más utilizados. Tiene una afinidad particular con la piel y el sistema inmunológico debido a sus propiedades antisépticas, antibacterianas, antivirales y antifúngicas. Posee un olor fuerte y a menudo se mezcla con la lavanda para endulzarlo Uno de los pocos aceites esenciales ques e pueden aplicar directamente sobre la piel, aunque siempre sea recomendable diluir en aceite base.',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_6_phase_5_profile_1 = Component::create([
            'name' => 'Ylang-ylang',
            'scientific_name' => 'Canangan Odorata Oil',
            'description' => 'El Ylang Ylang se produce a partir del árbol Cananga, de hoja perenne y gran altura que se cultiva en Madagascar, Malasia e Indonesia. El árbol produce grandes flores amarillas y blancas de las que se obtiene un poderoso aroma fragante. Su aceite esencial es vapor de agua destilada de las flores amarillas, que producen en aceite de mayor calidad que las flores blancas. Una sola destilación es interrumpida tres veces para producir 3 grados de calidad: grado 1(alta concentración), grado 2(media concentración) y grado 3 (baja concentración). A mayor concentracion, mayor cantidad de ésteres, lo que aporta un aroma más dulce. El aceite esencial de ylang ylang es muy empleado en perfumería por su exótica fragancia y se denomina afrodisíaco. También conocido por su aroma como "Flor de flores.',
            'phase_id' => $phase_5_profile_1->id,
            'profile_id' => $profile_1->id,
            'properties' => array(
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id,
                $properties_profile_1[random_int(0, count($properties_profile_1) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_6_phase_3_profile_2 = Component::create([
            'name' => 'Ylang-ylang',
            'scientific_name' => 'Canangan Odorata Oil',
            'description' => 'El Ylang Ylang se produce a partir del árbol Cananga, de hoja perenne y gran altura que se cultiva en Madagascar, Malasia e Indonesia. El árbol produce grandes flores amarillas y blancas de las que se obtiene un poderoso aroma fragante. Su aceite esencial es vapor de agua destilada de las flores amarillas, que producen en aceite de mayor calidad que las flores blancas. Una sola destilación es interrumpida tres veces para producir 3 grados de calidad: grado 1(alta concentración), grado 2(media concentración) y grado 3 (baja concentración). A mayor concentracion, mayor cantidad de ésteres, lo que aporta un aroma más dulce. El aceite esencial de ylang ylang es muy empleado en perfumería por su exótica fragancia y se denomina afrodisíaco. También conocido por su aroma como "Flor de flores.',
            'phase_id' => $phase_3_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))
        ]);

        $component_1_phase_4_profile_2 = Component::create([
            'name' => 'Optiphen',
            'scientific_name' => 'Phenoxyethano',
            'description' => 'El conservante Optiphen contiene fenoxietanol, un activo antimicrobiano. La excelente compatibilidad de pH permite su uso en formulaciones ácidas e incluso alcalinas, como también en diversidad de otras formulaciones cosméticas. Se puede usar solo ó de forma sinérgica con otros conservantes. Optiphen es adecuado para su uso en: cremas, serum, pomadas, lociones, peelings, emulsiones, geles, champú y aconcionadores.',
            'phase_id' => $phase_4_profile_2->id,
            'profile_id' => $profile_2->id,
            'properties' => array(
                $properties_profile_2[random_int(0, count($properties_profile_2) - 1)]->id,
            ),
            'expiration_date' => Carbon::now()->addDays(random_int(0, 365))

        ]);

        $composition_1_profile_1 = Composition::create([
            'name' => 'Cabello normal',
            'profile_id' => $profile_1->id,
            'phases_id' => [
                $phase_1_profile_1->id,
                $phase_2_profile_1->id,
                $phase_3_profile_1->id,
                $phase_4_profile_1->id,
                $phase_5_profile_1->id,
            ],
            'phases_percentage' => array(
                (object)['phase_id' => $phase_1_profile_1->id, 'phase' => $phase_1_profile_1, 'percentage' => 60],
                (object)['phase_id' => $phase_2_profile_1->id, 'phase' => $phase_2_profile_1, 'percentage' => 10],
                (object)['phase_id' => $phase_3_profile_1->id, 'phase' => $phase_3_profile_1, 'percentage' => 12],
                (object)['phase_id' => $phase_4_profile_1->id, 'phase' => $phase_4_profile_1, 'percentage' => 13],
                (object)['phase_id' => $phase_5_profile_1->id, 'phase' => $phase_5_profile_1, 'percentage' => 5],
            )
        ]);

        $composition_2_profile_1 = Composition::create([
            'name' => 'Cabello seco',
            'profile_id' => $profile_1->id,
            'phases_id' => [
                $phase_1_profile_1->id,
                $phase_2_profile_1->id,
                $phase_3_profile_1->id,
                $phase_4_profile_1->id,
                $phase_5_profile_1->id,
            ],
            'phases_percentage' => array(
                (object)['phase_id' => $phase_1_profile_1->id, 'phase' => $phase_1_profile_1,  'percentage' => 60],
                (object)['phase_id' => $phase_2_profile_1->id, 'phase' => $phase_2_profile_1, 'percentage' => 10],
                (object)['phase_id' => $phase_3_profile_1->id, 'phase' => $phase_3_profile_1, 'percentage' => 15],
                (object)['phase_id' => $phase_4_profile_1->id, 'phase' => $phase_4_profile_1, 'percentage' => 10],
                (object)['phase_id' => $phase_5_profile_1->id, 'phase' => $phase_5_profile_1, 'percentage' => 5],
            )
        ]);

        $composition_3_profile_1 = Composition::create([
            'name' => 'Cabello graso',
            'profile_id' => $profile_1->id,
            'phases_id' => [
                $phase_1_profile_1->id,
                $phase_2_profile_1->id,
                $phase_3_profile_1->id,
                $phase_4_profile_1->id,
                $phase_5_profile_1->id,
            ],
            'phases_percentage' => array(
                (object)['phase_id' => $phase_1_profile_1->id, 'phase' => $phase_1_profile_1, 'percentage' => 60],
                (object)['phase_id' => $phase_2_profile_1->id, 'phase' => $phase_2_profile_1, 'percentage' => 10],
                (object)['phase_id' => $phase_3_profile_1->id, 'phase' => $phase_3_profile_1, 'percentage' => 10],
                (object)['phase_id' => $phase_4_profile_1->id, 'phase' => $phase_4_profile_1, 'percentage' => 15],
                (object)['phase_id' => $phase_5_profile_1->id, 'phase' => $phase_5_profile_1, 'percentage' => 5],
            )
        ]);

        $composition_1_profile_2 = Composition::create([
            'name' => 'Piel grasa',
            'profile_id' => $profile_2->id,
            'phases_id' => [
                $phase_1_profile_2->id,
                $phase_2_profile_2->id,
                $phase_3_profile_2->id,
                $phase_4_profile_2->id,
            ],
            'phases_percentage' => array(
                (object)['phase_id' => $phase_1_profile_2->id, 'phase' => $phase_1_profile_2, 'percentage' => 50],
                (object)['phase_id' => $phase_2_profile_2->id, 'phase' => $phase_2_profile_2,  'percentage' => 35],
                (object)['phase_id' => $phase_3_profile_2->id, 'phase' => $phase_3_profile_2,  'percentage' => 5],
                (object)['phase_id' => $phase_4_profile_2->id, 'phase' => $phase_4_profile_2,  'percentage' => 10],
            )
        ]);

        
        $components_id = array(
            $component_1_phase_1_profile_1->id,
            $component_2_phase_1_profile_1->id,
            $component_1_phase_2_profile_1->id,
            $component_2_phase_2_profile_1->id,
            $component_1_phase_3_profile_1->id,
            $component_2_phase_3_profile_1->id,
            $component_1_phase_4_profile_1->id,
            $component_2_phase_4_profile_1->id,
            $component_2_phase_5_profile_1->id,
            $component_1_phase_5_profile_1->id,

        );
        $components = array(
            (object)['component_id' => $component_1_phase_1_profile_1->id, 'percentage' => 30],
            (object)['component_id' => $component_2_phase_1_profile_1->id, 'percentage' => 30],
            (object)['component_id' => $component_1_phase_2_profile_1->id, 'percentage' => 5],
            (object)['component_id' => $component_2_phase_2_profile_1->id, 'percentage' => 5],
            (object)['component_id' => $component_1_phase_3_profile_1->id, 'percentage' => 6],
            (object)['component_id' => $component_2_phase_3_profile_1->id, 'percentage' => 6],
            (object)['component_id' => $component_1_phase_4_profile_1->id, 'percentage' => 7],
            (object)['component_id' => $component_2_phase_4_profile_1->id, 'percentage' => 7],
            (object)['component_id' => $component_2_phase_5_profile_1->id, 'percentage' => 2],
            (object)['component_id' => $component_1_phase_5_profile_1->id, 'percentage' => 3],
        );
        $properties = array([]);
        foreach ($component_1_phase_1_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_2_phase_1_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_1_phase_2_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_2_phase_2_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_1_phase_3_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_2_phase_3_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_1_phase_4_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_2_phase_4_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_2_phase_5_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }
        foreach ($component_1_phase_5_profile_1->properties as $prop) {
            array_push($properties, $prop);
        }

        $properties = array_unique($properties);

        Recipe::create([
            'name' => 'Bernal',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum suscipit tortor, non laoreet neque condimentum eu. Maecenas at sodales purus. Sed vel varius risus, sed ultrices felis. Duis finibus varius fermentum. In congue odio non sem laoreet, sed auctor lorem porttitor. Suspendisse venenatis ante leo, id eleifend elit lacinia id. Morbi eleifend, enim gravida facilisis interdum, mauris dolor consequat eros, aliquet lobortis orci libero ut lectus. Nunc eu cursus mi, et tristique metus. Vestibulum ante lacus, iaculis id elit non, placerat maximus dui. Etiam eget leo nibh.',
            'profile_id' => $profile_1->id,
            'composition_id' => $composition_1_profile_1->id,
            'components' => $components,
            'components_id' => $components_id,
            'properties' => $properties
        ]);


        // \App\Models\User::factory(10)->create();
        // $this->call(UserTableSeeder::class);
        // $this->call(ProfileTableSeeder::class);

    }
}
