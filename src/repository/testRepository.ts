import { postgres } from '#config/postgres'

export default class TestRepository {
  static async getById(id: string) {
    return (
      await postgres.query('SELECT * FROM test_table WHERE id = $1', [id])
    ).rows
  }

  static async getFromIndexToSize(index: number, size: number) {
    return (
      await postgres.query(
        'SELECT * FROM test_table ORDER BY id LIMIT $1 OFFSET $2',
        [size, index],
      )
    ).rows
  }

  static async getAll() {
    return (await postgres.query('SELECT * FROM test_table')).rows
  }

  static async insert(name: string, phoneNumber: string) {
    await postgres.query(
      'INSERT INTO test_table (name, phone_number) VALUES ($1, $2)',
      [name, phoneNumber],
    )
  }

  static async update(id: string, name: string, phoneNumber: string) {
    await postgres.query(
      'UPDATE test_table SET name = $1, phone_number = $2 WHERE id = $3',
      [name, phoneNumber, id],
    )
  }
}
