<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory;
use App\Models\Uploads\UploadFile;

class FilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create(config('app.faker_locale'));
        
        $startDate = Carbon::create(2024, 12, 1);
        $endDate = Carbon::create(2025, 4, 30);

        for ($i = 0; $i < 100; $i++) {
            UploadFile::query()->create([
                'type' => $faker->randomElement(['incoming', 'outgoing']),
                'type_resource' => $faker->randomElement(['internal', 'external']),
                'date_received' => $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
                'time_released' => $faker->time(),
                'date_letter' => $faker->date(),
                'subject' => $faker->sentence(),
                'from' => $faker->company(),
                'agency' => $faker->companySuffix(),
                'received_by' => $faker->name(),
                'path' => $faker->url(),
            ]);
        }
    }
}
