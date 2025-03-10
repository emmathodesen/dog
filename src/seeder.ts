import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { connect, disconnect } from './repository/database';
import { userModel } from './models/userModel';
import { productModel } from './models/productModel';

async function seedDatabase() {
    await connect(); // Koble til databasen

    console.log("Seeding database...");

    // Generer en testbruker
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const user1 = new userModel({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash
    });

    await user1.save();
    console.log("Bruker opprettet:", user1);

    // 🔹 Generer 5 testprodukter
    for (let i = 0; i < 5; i++) {
        const product = new productModel({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            imageURL: "https://picsum.photos/500/500",
            price: faker.commerce.price({ min: 5, max: 5000 }),
            stock: faker.number.int({ min: 0, max: 200 }),
            isOnDiscount: faker.datatype.boolean(),
            discountPct: faker.number.int({ min: 0, max: 100 }),
            isHidden: false,
            _createdBy: user1._id, // Knytt produktet til brukeren
        });

        await product.save();
        console.log(`Produkt ${i + 1} opprettet:`, product);
    }

    await disconnect(); // Lukk databaseforbindelsen
    console.log(" Seeding ferdig!");
}

// Kjør funksjonen
seedDatabase().catch(console.error);
