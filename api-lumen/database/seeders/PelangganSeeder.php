<?php

namespace Database\Seeders;


use App\Models\Pelanggan;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class PelangganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        
        for ($i=0; $i < 100; $i++) { 
            $faker=Faker::create();
        $data=[
            'pelanggan'=>$faker->name,
            'alamat'=>$faker->address,
            'telp'=>$faker->phoneNumber
        ];

        Pelanggan::create($data);
        }
    }
}
