// Test to verify categories API
const testCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    console.log('Categories API Response:', data);
    
    // Test processing
    const processed = data.map((cat: any) => ({
      id: cat.slug,
      name: cat.name
    }));
    console.log('Processed Categories:', processed);
  } catch (error) {
    console.error('Error:', error);
  }
};

testCategories();
