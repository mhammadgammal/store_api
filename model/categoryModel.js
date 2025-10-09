import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    'name': {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        minLength: [3, 'Category name must be at least 3 characters long'],
        maxLength: [50, 'Category name must not exceed 50 characters'],
        unique: true,
    },
    'image': String,
    'slug': {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    }
}, { timestamps: true });

// Simple slugify helper
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric and non-hyphen
        .replace(/-+/g, '-');            // Replace multiple - with single -
}

// Generate unique slug before saving
categorySchema.pre('save', async function (next) {
    try {
        if (!this.isModified('name')) return next();

        const base = slugify(this.name);
        let slug = base;
        let count = 0;

        // Ensure uniqueness by appending a counter if needed
        while (await this.constructor.exists({ slug })) {
            count += 1;
            slug = `${base}-${count}`;
        }

        this.slug = slug;
        return next();
    } catch (err) {
        return next(err);
    }
});

const Category = model('Category', categorySchema);

export default Category;